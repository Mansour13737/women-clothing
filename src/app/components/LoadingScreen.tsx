'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  loadedImages?: number;
  totalImages?: number;
}

export default function LoadingScreen({ 
  onLoadingComplete, 
  loadedImages = 0, 
  totalImages = 0 
}: LoadingScreenProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    if (totalImages > 0) {
      const progress = (loadedImages / totalImages) * 100;
      setLoadingProgress(progress);
      
      if (progress >= 100) {
        setTimeout(() => {
          onLoadingComplete();
        }, 500);
      }
    } else {
      // Fallback animation if no images detected
      const interval = setInterval(() => {
        setLoadingProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              onLoadingComplete();
            }, 500);
            return 100;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [loadedImages, totalImages, onLoadingComplete]);

  const progressText = totalImages > 0 
    ? `Loading images... ${loadedImages}/${totalImages}`
    : `Loading... ${Math.round(loadingProgress)}%`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#dcdddc] to-[#f5f5f5]">
      <div className="text-center animate-fade-in-up">
        {/* Logo/Brand */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-[#262013] mb-2">
            Women&apos;s Fashion
          </h1>
          <p className="text-sm text-[#262013]/70 font-serif">
            Timeless Elegance
          </p>
        </div>

        {/* Loading Animation */}
        <div className="relative w-64 h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#262013] to-[#4a4a4a] rounded-full transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
          {loadingProgress < 100 && (
            <div className="absolute top-0 left-0 w-full h-full shimmer opacity-30" />
          )}
        </div>

        {/* Progress Text */}
        <p className="text-sm text-[#262013]/80 font-serif">
          {progressText}
        </p>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center space-x-2">
          <div className="w-2 h-2 bg-[#262013] rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
          <div className="w-2 h-2 bg-[#262013] rounded-full animate-pulse" style={{ animationDelay: '200ms' }} />
          <div className="w-2 h-2 bg-[#262013] rounded-full animate-pulse" style={{ animationDelay: '400ms' }} />
        </div>
      </div>
    </div>
  );
} 