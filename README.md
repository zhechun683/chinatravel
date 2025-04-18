# China Travel

A Progressive Web App (PWA) for exploring tourist destinations in China, built with Next.js.

## Project Introduction

China Travel is a modern tourism application that helps users explore travel destinations across China. The app offers a variety of features including destination browsing, attraction details, hotel bookings, and activity recommendations.

## Demo Screenshots

### Desktop Experience
![Desktop Demo Screenshot](./LapTop.png)
*Demo video file location: DemoLapTop.mp4 in project root directory*

### Mobile Experience
<img src="./Phone.png" alt="Mobile Demo Screenshot" width="50%">

*Demo video file location: DemoPhone.mp4 in project root directory*

## Features

- **Destination Browsing**: Explore famous tourist attractions across China
- **Detailed Information**: View detailed information and images for each destination
- **Offline Support**: Basic offline functionality with custom offline page
- **Responsive Design**: Interface optimized for various devices
- **PWA Support**: Can be installed on mobile device home screens for a native app-like experience

## Getting Started

### System Requirements

- Node.js 18.x or higher
- npm package manager

### Installation Steps

1. Clone the repository

```bash
git clone https://github.com/zhechun683/chinatravel.git
cd chinatravel
```

2. Install dependencies

```bash
npm install
```

### Running the Project

#### Development Mode

```bash
npm run dev
```

The application will be accessible at [http://localhost:3000](http://localhost:3000).

#### Production Mode

Build the application:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

### Usage

#### Desktop

- Access the application URL in a browser
- Browse recommended destinations on the homepage
- Click on destination cards to view detailed information
- Use the navigation menu to access attractions, hotels, and activities pages
- Log in to your account to make bookings and manage your itinerary

#### Mobile

The application is fully optimized for mobile devices:

1. **Mobile Browser Access**:
   - Open the application URL in a mobile browser
   - The interface automatically adapts to the screen size
   - Use the bottom navigation bar to access main features

2. **PWA Installation**:
   - On supported mobile browsers (Chrome, Safari), you'll see an "Add to Home Screen" option
   - After installation, the app will appear on your home screen with an app icon
   - Launch the app from the home screen for a full-screen, app-like experience

3. **Offline Capabilities**:
   - Once installed, basic content will be available even without an internet connection
   - A custom offline page will be displayed when trying to access unavailable content

## Deployment

### Deploying to Netlify

This project is configured for direct deployment to Netlify. After each push to the main branch, Netlify automatically builds and deploys the application.

Access the deployed application: [https://china-travel.netlify.app](https://china-travel.netlify.app)

## Troubleshooting

If you encounter issues:

1. Ensure all PWA-related files are correctly created (manifest.json, sw.js)
2. Make sure all necessary icons have been generated
3. Test PWA features in production build (disabled in development mode)
4. Check the browser console for error messages

## Project References and Original Contributions

### References

This project's UI structure and design foundations reference the open-source project [Goout](https://github.com/akmalseptiyana/goout.git), while making substantial modifications to adapt to the China travel theme and adding significant original functionalities.

### Original Contributions

- **Progressive Web App (PWA) Implementation**: Full offline capability, service worker configuration, and app installation flow
- **Account Management System**: Complete user account functionality with profile management and booking history
- **Device API Integration**: Geolocation services for attractions and camera integration for user avatars
- **Offline Data Storage**: Client-side data persistence using IndexedDB for offline access to bookings and attraction data
- **Interactive Navigation Elements**: Custom implementation of application navigation and interactive elements
- **China Tourism Content**: All China-specific content, descriptions, and localized design elements

For a comprehensive description of references and original contributions, please see the full project report.

## License

This project is licensed under the MIT License - see the LICENSE file for details.