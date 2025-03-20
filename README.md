
# VidTube - Learning Platform

VidTube is a modern video learning platform built with React, TypeScript, and Tailwind CSS.

## Project info

**URL**: https://lovable.dev/projects/eb3325cb-82f3-4bb7-aba7-bb7d484a96bf

## How to run this project locally (offline)

### Prerequisites

Before running this project, make sure you have the following installed on your computer:

1. **Node.js** (version 16 or higher) - [Download from nodejs.org](https://nodejs.org/en/download/)
2. **npm** (comes bundled with Node.js)

### Installation Steps

1. **Clone the repository or download the ZIP file from GitHub**
   ```sh
   git clone <YOUR_GIT_URL>
   # OR download and extract the ZIP file from GitHub
   ```

2. **Navigate to the project directory**
   ```sh
   cd <YOUR_PROJECT_NAME>
   ```

3. **Install the necessary dependencies**
   ```sh
   npm install
   ```
   This step might take a few minutes depending on your internet connection.

4. **Start the development server**
   ```sh
   npm run dev
   ```

5. **Open your browser** and go to the URL shown in the terminal (usually [http://localhost:8080](http://localhost:8080))

### Troubleshooting

- If you see `command not found: npm`, it means Node.js is not properly installed or not in your PATH. Reinstall Node.js and make sure to include it in your PATH.
- If you get errors during `npm install`, try running `npm cache clean --force` and then `npm install` again.
- If the page doesn't load or appears blank, check your browser's console for errors (F12 or right-click > Inspect > Console).

### Building for Production

To create a production build that you can deploy to any static hosting service:

1. **Run the build command**
   ```sh
   npm run build
   ```

2. **The build files will be in the `dist` folder**. You can deploy these files to any static hosting service.

## Important Notes

- You **cannot** run this project by simply opening the index.html file in a browser or with Live Server. React applications need to be properly built and served.
- Make sure all dependencies are installed before running the development server or building for production.
- If you make any changes to the code, the development server will automatically reload with your changes.

## Project Structure

- `/src` - Contains the source code for the application
  - `/components` - Reusable UI components
  - `/pages` - Page components for different routes
  - `/lib` - Utility functions and helpers
  - `/hooks` - Custom React hooks
- `/public` - Static assets like images and icons

## Technologies Used

- Vite
- TypeScript
- React
- React Router
- shadcn/ui
- Tailwind CSS
- Tanstack Query (React Query)

## Need Help?

If you're having trouble running the project or have any questions, feel free to reach out through the Lovable platform.
