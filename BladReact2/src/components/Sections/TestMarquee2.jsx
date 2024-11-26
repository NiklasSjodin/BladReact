// src/components/Sections/TestMarquee.jsx
import React from 'react';
import image11 from '../../images/marqueeImages/hjarnstark.jpg';
import image12 from '../../images/marqueeImages/inte-kara.jpg';
import image13 from '../../images/marqueeImages/intermezzo.jpg';
import image14 from '../../images/marqueeImages/klubben-for-en-lyckligare-jul.jpg';
import image15 from '../../images/marqueeImages/kungen-av-nostratien.jpg';
import image16 from '../../images/marqueeImages/kungen-av-vrede.jpg';
import image17 from '../../images/marqueeImages/mirage.jpg';
import image18 from '../../images/marqueeImages/rummet-i-jorden_pocket.jpg';
import image19 from '../../images/marqueeImages/strandlasning.jpg';
import image20 from '../../images/marqueeImages/vaninnorna-pa-nordiska-kompaniet.jpg';



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
    { src: image11, alt: 'bookcover for marquee 11' },
    { src: image12, alt: 'bookcover for marquee 12' },
    { src: image13, alt: 'bookcover for marquee 13' },
    { src: image14, alt: 'bookcover for marquee 14' },
    { src: image15, alt: 'bookcover for marquee 15' },
    { src: image16, alt: 'bookcover for marquee 16' },
    { src: image17, alt: 'bookcover for marquee 17' },
    { src: image18, alt: 'bookcover for marquee 18' },
    { src: image19, alt: 'bookcover for marquee 19' },
    { src: image20, alt: 'bookcover for marquee 20' },
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