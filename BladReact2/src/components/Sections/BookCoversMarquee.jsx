import Image1 from '../../images/anjali-mehta-q7LqBzBG8rA-unsplash.jpg';
import Image2 from '../../images/charlesdeluvio-EV2Y6-NzDyU-unsplash.jpg';
import Image3 from '../../images/clay-banks-Z5vZCy8xDZU-unsplash.jpg';
import Image4 from '../../images/karolina-grabowska-H_eb_VfG2Ow-unsplash.jpg';
import Image5 from '../../images/olena-bohovyk-Ft_Wn-K5YH8-unsplash.jpg';

const MarqueeComponent = () => {
  return (
    <div className="w-full overflow-hidden marquee">
      <div className="marquee-content">
        {/* Uppsättning av bilder */}
        <img className='rounded' src={Image1} alt="Image 1" />
        <img className='rounded' src={Image2} alt="Image 2" />
        <img className='rounded' src={Image3} alt="Image 3" />
        <img className='rounded' src={Image4} alt="Image 4" />
        <img className='rounded' src={Image5} alt="Image 5" />
        {/* Kopiera samma uppsättning bilder för att skapa loop */}
        <img className='rounded' src={Image1} alt="Image 1" />
        <img className='rounded' src={Image2} alt="Image 2" />
        <img className='rounded' src={Image3} alt="Image 3" />
        <img className='rounded' src={Image4} alt="Image 4" />
        <img className='rounded' src={Image5} alt="Image 5" />
         {/* Kopiera samma uppsättning bilder för att skapa loop */}
        <img className='rounded' src={Image1} alt="Image 1" />
        <img className='rounded' src={Image2} alt="Image 2" />
        <img className='rounded' src={Image3} alt="Image 3" />
        <img className='rounded' src={Image4} alt="Image 4" />
        <img className='rounded' src={Image5} alt="Image 5" />
         {/* Kopiera samma uppsättning bilder för att skapa loop */}
        <img className='rounded' src={Image1} alt="Image 1" />
        <img className='rounded' src={Image2} alt="Image 2" />
        <img className='rounded' src={Image3} alt="Image 3" />
        <img className='rounded' src={Image4} alt="Image 4" />
        <img className='rounded' src={Image5} alt="Image 5" />
        {/* Kopiera samma uppsättning bilder för att skapa loop */}
        <img className='rounded' src={Image1} alt="Image 1" />
        <img className='rounded' src={Image2} alt="Image 2" />
        <img className='rounded' src={Image3} alt="Image 3" />
        <img className='rounded' src={Image4} alt="Image 4" />
        <img className='rounded' src={Image5} alt="Image 5" />
      </div>
    </div>
  );
};

export default MarqueeComponent;
