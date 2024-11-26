// src/components/Sections/TestMarquee.jsx
import React from 'react';
import image1 from '../../images/marqueeImages/acotar.jpg';
import image2 from '../../images/marqueeImages/alskade-betty.jpg';
import image3 from '../../images/marqueeImages/benadaren.jpg';
import image4 from '../../images/marqueeImages/den-som-foljer-en-stjarna-vander-inte-om.jpg';
import image5 from '../../images/marqueeImages/doda-kvinnor-forlater-inte.jpg';
import image6 from '../../images/marqueeImages/dune.jpg';
import image7 from '../../images/marqueeImages/en-lyckligare-tid.jpg';
import image8 from '../../images/marqueeImages/fourth-wing.jpg';
import image9 from '../../images/marqueeImages/grand-final.jpg';
import image10 from '../../images/marqueeImages/hercule-poirots-stilla-natt.png';

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
    { src: image1, alt: 'bookcover for marquee 1' },
    { src: image2, alt: 'bookcover for marquee 2' },
    { src: image3, alt: 'bookcover for marquee 3' },
    { src: image4, alt: 'bookcover for marquee 4' },
    { src: image5, alt: 'bookcover for marquee 5' },
    { src: image6, alt: 'bookcover for marquee 6' },
    { src: image7, alt: 'bookcover for marquee 7' },
    { src: image8, alt: 'bookcover for marquee 8' },
    { src: image9, alt: 'bookcover for marquee 9' },
    { src: image10, alt: 'bookcover for marquee 10' },
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