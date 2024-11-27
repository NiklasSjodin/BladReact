// src/components/Sections/TestMarquee.jsx
import React from 'react';

import Cover1 from '../../images/bookCoversMainPage/Cover1.jpg';
import Cover2 from '../../images/bookCoversMainPage/Cover2.jpg';
import Cover3 from '../../images/bookCoversMainPage/Cover3.jpg';
import Cover5 from '../../images/bookCoversMainPage/Cover5.jpg';
import Cover6 from '../../images/bookCoversMainPage/Cover6.jpg';
import Cover7 from '../../images/bookCoversMainPage/Cover7.jpg';
import Cover8 from '../../images/bookCoversMainPage/Cover8.jpg';
import Cover9 from '../../images/bookCoversMainPage/Cover9.jpg';


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
    { src: Cover1, alt: 'Image 1' },
    { src: Cover2, alt: 'Image 2' },
    // { src: Cover3, alt: 'Image 3' },
    // { src: Cover6, alt: 'Image 4' },
    { src: Cover7, alt: 'Image 5' },
    { src: Cover8, alt: 'Image 5' },
    { src: Cover9, alt: 'Image 5' },

  ];

  return (
    <div className="my-8 ">
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