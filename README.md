# China Travel PWA

A Progressive Web App (PWA) for exploring tourist destinations in China, built with Next.js.

## Features

- **Destination Browsing**: Explore famous tourist attractions across China
- **Location Information**: View detailed information about each destination
- **Offline Support**: Basic offline functionality with custom offline page
- **Responsive Design**: Interface suitable for various devices
- **Multi-language Support**: Chinese and English interfaces

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/chinatravel.git
cd chinatravel
```

2. Install dependencies

```bash
npm install
```

3. Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```
NEXT_PUBLIC_AMAP_KEY=your_amap_api_key
```

### Running the Application

#### Development Mode

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

#### Production Mode

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Mobile Usage

The application is fully responsive and optimized for mobile devices:

1. **Mobile Browser Access**:
   - Open the application URL in a mobile browser
   - The interface will automatically adapt to the screen size

2. **PWA Installation on Mobile**:
   - On supported mobile browsers (Chrome, Safari), you'll see an "Add to Home Screen" option
   - After installation, the app will appear on your home screen with an app icon
   - Launch the app from the home screen for a full-screen, app-like experience

3. **Offline Capabilities**:
   - Once installed, basic content will be available even without an internet connection
   - Custom offline page will be displayed when trying to access unavailable content

## PWA Configuration

1. **Generate PWA Icons**

   Install the icon generation tool:

   ```bash
   npm install sharp --save-dev
   ```

   Run the icon generation script:

   ```bash
   npm run generate-icons
   ```

   This will create all necessary icons in the `public/icons` directory.

2. **Testing PWA Features**

   - PWA features are disabled in development mode by default
   - Use Chrome DevTools > Application > Service Workers and Manifest to check PWA configuration
   - In supported browsers, you should see an installation prompt or install the app via the browser menu
   - Test offline functionality by enabling "Offline" mode in DevTools

## Deployment

### Deploying to Vercel

The easiest way to deploy this application is using Vercel:

```bash
npm install -g vercel
vercel
```

### Deploying to Netlify

To deploy to Netlify:

1. Create a `netlify.toml` file in the project root:

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

[build.environment]
  NEXT_USE_NETLIFY_EDGE = "true"
```

2. Install Netlify Next.js plugin:

```bash
npm install -D @netlify/plugin-nextjs
```

3. Deploy using Netlify CLI:

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

4. Configure environment variables in the Netlify dashboard.

## Troubleshooting

If you encounter issues:

1. Ensure all PWA-related files are correctly created (manifest.json, sw.js)
2. Make sure all necessary icons have been generated
3. Test PWA features in production build (disabled in development mode)
4. Check browser console for error messages

## License

This project is licensed under the MIT License - see the LICENSE file for details.