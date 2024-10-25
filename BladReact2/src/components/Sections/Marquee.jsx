// src/components/Sections/MarqueeComponent.jsx
import React, { useEffect } from 'react';

function MarqueeComponent({ 
  images = [], 
  direction = 'left',
  speed = 30,
  height = '12rem',
  width = '100%',     // New prop with default
  gap = '0.75rem',    // Moved existing prop up here for clarity
  imageWidth = 'auto' // New prop for controlling individual image width
}) {
  useEffect(() => {
    const styles = `
      @keyframes marqueeLeft {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(-50%);
        }
      }

      @keyframes marqueeRight {
        0% {
          transform: translateX(-50%);
        }
        100% {
          transform: translateX(0);
        }
      }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  const repeatCount = 5;
  const repeatedImages = Array(repeatCount)
    .fill(images)
    .flat();
  
  return (
    <div 
      className="overflow-hidden flex items-center"
      style={{ width: width }} // Container width is now configurable
    >
      <div className="flex w-[200%] justify-around">
        <div 
          className="flex min-w-full justify-around"
          style={{
            animation: `${direction === 'right' ? 'marqueeRight' : 'marqueeLeft'} ${speed}s linear infinite`,
          }}
        >
          {/* First set of images */}
          {repeatedImages.map((image, index) => (
            <img
              key={`${image.src}-${index}`}
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              className="rounded flex-shrink-0 shadow-lg"
              style={{
                height: height,
                width: imageWidth,
                marginRight: gap,
              }}
            />
          ))}
          {/* Second set of images */}
          {repeatedImages.map((image, index) => (
            <img
              key={`${image.src}-${index}-duplicate`}
              src={image.src}
              alt={image.alt || `Image ${index + 1}`}
              className="rounded flex-shrink-0 shadow-lg"
              style={{
                height: height,
                width: imageWidth,
                marginRight: gap,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarqueeComponent;