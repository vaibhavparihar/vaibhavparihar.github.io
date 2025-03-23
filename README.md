# Vaibhav Parihar - Portfolio Website

A sophisticated, minimalist portfolio website built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- Modern, responsive design with a clean aesthetic
- Interactive particle animation background
- Smooth scrolling and animations with Framer Motion
- Dark mode support with system preference detection
- Optimized for performance and accessibility
- Complete sections for:
  - Hero introduction
  - About & education
  - Professional experience
  - Projects showcase
  - Skills & technologies
  - Certifications
  - Contact information

## Tech Stack

- **Framework**: Next.js 15.1.0 with App Router
- **Language**: TypeScript
- **UI**: React 19
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui (Radix UI based components)
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Theming**: next-themes

## Dependencies

### Core Dependencies

```json
{
  "dependencies": {
    "next": "15.1.0",
    "react": "^19",
    "react-dom": "^19",
    "next-themes": "latest",
    "framer-motion": "latest",
    "lucide-react": "^0.454.0",
    "tailwindcss-animate": "^1.0.7",
    "tailwind-merge": "^2.5.5",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1"
  }
}
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
# or
yarn build
# or
pnpm build
```

### Run Production Build

```bash
npm run start
# or
yarn start
# or
pnpm start
```

## Project Structure

```
portfolio/
├── app/                  # Next.js App Router
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── ui/               # shadcn/ui components
│   ├── about.tsx         # About section
│   ├── certifications.tsx # Certifications section
│   ├── contact.tsx       # Contact section
│   ├── experience.tsx    # Experience section
│   ├── hero.tsx          # Hero section
│   ├── navbar.tsx        # Navigation bar
│   ├── particle-background.tsx # Particle animation
│   ├── projects.tsx      # Projects section
│   ├── scroll-to-top.tsx # Scroll to top button
│   ├── skills.tsx        # Skills section
│   └── theme-provider.tsx # Theme provider
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── public/               # Static assets
│   ├── fonts/            # Custom fonts
│   └── images/           # Images and profile picture
├── next.config.mjs       # Next.js configuration
├── package.json          # Project dependencies
├── postcss.config.mjs    # PostCSS configuration
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```



For other deployment options, build the application using `npm run build` and deploy the built files to your hosting provider.

## Customization

### Theming

The color scheme can be modified in the `tailwind.config.ts` file. The project uses Tailwind CSS's color system with CSS variables for theming.

### Adding New Sections

To add a new section:

1. Create a new component in the `components` directory
2. Import and add the component to `app/page.tsx`
3. Add a navigation link in `components/navbar.tsx`

## Browser Support

This portfolio website is compatible with all modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Lucide Icons](https://lucide.dev/)

