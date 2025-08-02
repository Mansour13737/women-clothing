'use client';

import { useEffect, useState } from 'react';
import LoadingScreen from './LoadingScreen';

interface ImageLoaderProps {
  children: React.ReactNode;
}

export default function ImageLoader({ children }: ImageLoaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  useEffect(() => {
    const loadAllImages = async () => {
      // Find all images in the DOM
      const images = document.querySelectorAll('img');
      const backgroundImages = getBackgroundImages();
      
      const totalImageCount = images.length + backgroundImages.length;
      setTotalImages(totalImageCount);

      if (totalImageCount === 0) {
        // If no images found, complete loading after a short delay
        setTimeout(() => setIsLoading(false), 1000);
        return;
      }

      let loadedCount = 0;
      const imagePromises: Promise<void>[] = [];

      // Handle regular images
      images.forEach((img) => {
        if (img.complete) {
          loadedCount++;
          setLoadedImages(loadedCount);
        } else {
          const promise = new Promise<void>((resolve) => {
            img.addEventListener('load', () => {
              loadedCount++;
              setLoadedImages(loadedCount);
              resolve();
            });
            img.addEventListener('error', () => {
              loadedCount++;
              setLoadedImages(loadedCount);
              resolve();
            });
          });
          imagePromises.push(promise);
        }
      });

      // Handle background images
      backgroundImages.forEach((bgImage) => {
        const promise = new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            loadedCount++;
            setLoadedImages(loadedCount);
            resolve();
          };
          img.onerror = () => {
            loadedCount++;
            setLoadedImages(loadedCount);
            resolve();
          };
          img.src = bgImage;
        });
        imagePromises.push(promise);
      });

      // Wait for all images to load
      try {
        await Promise.all(imagePromises);
        setTimeout(() => setIsLoading(false), 500);
      } catch (error) {
        console.log('Some images failed to load, continuing...');
        setTimeout(() => setIsLoading(false), 500);
      }

      // Fallback: if loading takes too long, complete anyway
      setTimeout(() => {
        setIsLoading(false);
      }, 5000);
    };

    // Small delay to ensure DOM is ready
    setTimeout(loadAllImages, 100);
  }, []);

  const getBackgroundImages = (): string[] => {
    const bgImages: string[] = [];
    const elements = document.querySelectorAll('*');
    
    elements.forEach((element) => {
      const style = window.getComputedStyle(element);
      const backgroundImage = style.backgroundImage;
      
      if (backgroundImage && backgroundImage !== 'none') {
        const matches = backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/g);
        if (matches) {
          matches.forEach(match => {
            const url = match.replace(/url\(['"]?([^'"]+)['"]?\)/, '$1');
            if (url && !bgImages.includes(url)) {
              bgImages.push(url);
            }
          });
        }
      }
    });
    
    return bgImages;
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <LoadingScreen 
        onLoadingComplete={handleLoadingComplete}
        loadedImages={loadedImages}
        totalImages={totalImages}
      />
    );
  }

  return <>{children}</>;
} 