/**
 * Script to clean up node_modules and lock files for a fresh install
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧹 Cleaning project...');

// Delete node_modules
if (fs.existsSync('node_modules')) {
  console.log('Removing node_modules directory...');
  try {
    fs.rmSync('node_modules', { recursive: true, force: true });
    console.log('✅ node_modules removed');
  } catch (error) {
    console.error('Error removing node_modules:', error);
  }
}

// Delete lock files
const lockFiles = ['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
lockFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Removing ${file}...`);
    try {
      fs.unlinkSync(file);
      console.log(`✅ ${file} removed`);
    } catch (error) {
      console.error(`Error removing ${file}:`, error);
    }
  }
});

// Delete .next and out directories
['out', '.next'].forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`Removing ${dir} directory...`);
    try {
      fs.rmSync(dir, { recursive: true, force: true });
      console.log(`✅ ${dir} removed`);
    } catch (error) {
      console.error(`Error removing ${dir}:`, error);
    }
  }
});

// Run a fresh install
console.log('🔄 Installing dependencies...');
try {
  execSync('npm install --legacy-peer-deps', { stdio: 'inherit' });
  console.log('✅ Dependencies installed');
} catch (error) {
  console.error('Error installing dependencies:', error);
}

console.log('🎉 Cleanup completed!'); 