/**
 * Script to fix all import paths from '@/components/...' to relative paths
 */
const fs = require('fs');
const path = require('path');

const componentsDir = path.join(__dirname, 'components');

function fixComponentsImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace '@/components/ui/' with '../ui/' for files in components directory
    let updatedContent = content.replace(/@\/components\/ui\//g, '../ui/');
    
    // Replace '@/components/' with '../' for files in components directory
    updatedContent = updatedContent.replace(/@\/components\//g, '../');
    
    // Only write file if changes were made
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Fixed imports in: ${path.relative(__dirname, filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

function fixUIImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Handle circular import: Replace '../ui/button' with './button' in UI components
    let updatedContent = content.replace(/from "\.\.\/ui\/(.+?)"/g, 'from "./$1"');
    
    // Replace '@/components/ui/' with './' for files in ui directory
    updatedContent = updatedContent.replace(/@\/components\/ui\//g, './');
    
    // Only write file if changes were made
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Fixed imports in UI component: ${path.relative(__dirname, filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing UI component ${filePath}:`, error);
  }
}

function processDirectories() {
  // Create a list of all files to process
  const allFiles = [];
  
  // First get UI files
  const uiDir = path.join(componentsDir, 'ui');
  if (fs.existsSync(uiDir)) {
    fs.readdirSync(uiDir).forEach(file => {
      const filePath = path.join(uiDir, file);
      const stats = fs.statSync(filePath);
      
      if (!stats.isDirectory() && /\.(tsx|jsx|ts|js)$/.test(file)) {
        allFiles.push({path: filePath, isUI: true});
      }
    });
  }
  
  // Get non-UI components
  function scanDirectory(dir) {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isDirectory()) {
        if (filePath !== uiDir) { // Skip UI dir as we already processed it
          scanDirectory(filePath);
        }
      } else if (/\.(tsx|jsx|ts|js)$/.test(file)) {
        allFiles.push({path: filePath, isUI: false});
      }
    });
  }
  
  scanDirectory(componentsDir);
  
  // Process files
  console.log(`Found ${allFiles.length} files to process`);
  let fixedCount = 0;
  
  allFiles.forEach(file => {
    if (file.isUI) {
      fixUIImports(file.path);
    } else {
      fixComponentsImports(file.path);
    }
    fixedCount++;
  });
  
  console.log(`Fixed imports in ${fixedCount} files`);
}

// Also fix App component imports
const appDir = path.join(__dirname, 'app');
function fixAppImports(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Replace '@/components/' with '../components/' for app directory
    const updatedContent = content.replace(/@\/components\//g, '../components/');
    
    // Only write file if changes were made
    if (content !== updatedContent) {
      fs.writeFileSync(filePath, updatedContent, 'utf8');
      console.log(`✅ Fixed imports in app: ${path.relative(__dirname, filePath)}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

function processAppDirectory(directory) {
  if (!fs.existsSync(directory)) return;
  
  const files = fs.readdirSync(directory);
  
  files.forEach(file => {
    const filePath = path.join(directory, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isDirectory()) {
      // Process subdirectories
      processAppDirectory(filePath);
    } else if (/\.(tsx|jsx|ts|js)$/.test(file)) {
      // Process .tsx, .jsx, .ts, .js files
      fixAppImports(filePath);
    }
  });
}

console.log('🔍 Fixing import paths...');

// Process components and UI
processDirectories();

// Process app directory
if (fs.existsSync(appDir)) {
  processAppDirectory(appDir);
}

console.log('✨ Import paths fixed!'); 