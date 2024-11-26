import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import HeroPicture from "../../images/books.png";
import TestMarquee from '../../components/Sections/TestMarquee';
import TestMarquee2 from '../../components/Sections/TestMarquee2';
import { TextParallaxContentExample } from '../../components/Sections/TextParallaxScroll';
import Information from '../../components/Sections/InformationSection';
import { BouncyCardsFeatures } from '@/components/Sections/BouncyCards';
import Footer from '@/components/Footer/DesktopFooter';

export default function MainPage() {
	const navigate = useNavigate();

	return (
		<>
			<div className='w-screen h-screen flex items-center bg-hero-pattern bg-cover bg-center bg-no-repeat px-20'>
				<div className='w-1/2 lg: text-left pr-8'>
					<h1 className='text-4xl font-bold tracking-tight text-white sm:text-6xl'>
						Skapa din perfekta bokhylla och dela dina favoriter
					</h1>
					<p className='mt-6 text-lg leading-8 text-white w-1/2'>
						Håll koll på din läsning och upptäck böcker som inspirerar. Med Blad
						är varje sida ett nytt äventyr att dela.
					</p>
					<div className='mt-8 flex items-center gap-x-6'>
						<Link
							to='signup'
							className='rounded-md bg-orange-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition duration-300 ease-in-out'
						>
							Registrera dig nu
						</Link>
					</div>
				</div>
				{/* <div className="flex-1 hidden md:block">
          <img
            src={HeroPicture}
            alt="Description of image"
            className="w-full h-auto max-h-64 object-contain rounded-lg"
          />
        </div> */}
			</div>

			{/* <BookCoversMarquee/> */}
			<TestMarquee direction='left' height='10rem' />
			<TestMarquee2 direction='right' height='14rem' />
			<BouncyCardsFeatures />
			<Information />
			<TextParallaxContentExample />
		</>
	);
}
