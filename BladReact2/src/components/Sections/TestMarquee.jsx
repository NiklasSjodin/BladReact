// src/components/Sections/TestMarquee.jsx
import React from 'react';
import Image1 from '../../Images/anjali-mehta-q7LqBzBG8rA-unsplash.jpg';
import Image2 from '../../Images/charlesdeluvio-EV2Y6-NzDyU-unsplash.jpg';
import Image3 from '../../Images/clay-banks-Z5vZCy8xDZU-unsplash.jpg';
import Image4 from '../../Images/karolina-grabowska-H_eb_VfG2Ow-unsplash.jpg';
import Image5 from '../../Images/olena-bohovyk-Ft_Wn-K5YH8-unsplash.jpg';
import MarqueeComponent from './Marquee';

const TestMarquee = ({ 
  direction = "left", 
  speed = 30,
  width = "100%",
  height = "12rem",
  gap = "0.75rem",
  imageWidth = "auto"
}) => {
  const images = [
    { src: Image1, alt: 'Image 1' },
    { src: Image2, alt: 'Image 2' },
    { src: Image3, alt: 'Image 3' },
    { src: Image4, alt: 'Image 4' },
    { src: Image5, alt: 'Image 5' },
  ];

  return (
    <div className="my-8">
      <MarqueeComponent 
        images={images}
        direction={direction}
        speed={speed}
        width={width}
        height={height}
        gap={gap}
        imageWidth={imageWidth}
      />
    </div>
  );
};

export default TestMarquee;