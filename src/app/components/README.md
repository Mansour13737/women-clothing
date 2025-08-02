# Loading System Documentation

## Overview
This project includes a comprehensive loading system that displays a beautiful loading screen until all images in the project are fully loaded.

## Components

### ImageLoader.tsx
- **Purpose**: Main component that wraps the entire application and manages the loading state
- **Features**:
  - Detects all images in the DOM (including Next.js Image components)
  - Detects background images from CSS
  - Tracks loading progress in real-time
  - Shows loading screen until all images are loaded
  - Has a 5-second fallback timeout

### LoadingScreen.tsx
- **Purpose**: Displays the actual loading UI
- **Features**:
  - Beautiful gradient background matching the project theme
  - Progress bar showing actual image loading progress
  - Animated decorative elements
  - Responsive design
  - Shows "Loading images... X/Y" when images are detected
  - Shows "Loading... X%" as fallback animation

## How It Works

1. **Image Detection**: The system scans the DOM for:
   - All `<img>` tags
   - Next.js `<Image>` components
   - Background images from CSS styles

2. **Loading Tracking**: Each image is tracked individually:
   - Already loaded images are counted immediately
   - Loading images are tracked with event listeners
   - Failed images are also counted to prevent hanging

3. **Progress Display**: The loading screen shows:
   - Real-time progress bar
   - Current count of loaded images
   - Smooth animations and transitions

4. **Completion**: When all images are loaded:
   - Progress reaches 100%
   - Loading screen fades out
   - Main content becomes visible

## Usage

The loading system is automatically active throughout the entire application. It's integrated in the root layout (`src/app/layout.tsx`) and will work on all pages.

## Customization

You can customize the loading screen by modifying:
- Colors in `LoadingScreen.tsx`
- Animations in `globals.css`
- Timing in `ImageLoader.tsx`

## Files Modified
- `src/app/layout.tsx` - Added ImageLoader wrapper
- `src/app/globals.css` - Added custom animations
- `src/app/components/LoadingScreen.tsx` - Created loading UI
- `src/app/components/ImageLoader.tsx` - Created image tracking logic 