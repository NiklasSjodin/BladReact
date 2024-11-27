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
			<div className='w-screen h-screen flex items-center bg-hero-pattern bg-cover bg-center bg-no-repeat px-6 md:px-20'>
				<div className='w-full md:w-1/2 text-center md:text-left pr-8'>
					<h1 className='text-3xl  md:text-5xl font-bold tracking-tight text-black sm:text-6xl'>
						Skapa din perfekta bokhylla och dela dina favoriter
					</h1>
					<p className='mt-4 sm:mt-6 text-base sm:text-lg leading-6 sm:leading-8 text-black'>
						Håll koll på din läsning och upptäck böcker som inspirerar. Med Blad
						är varje sida ett nytt äventyr att dela.
					</p>
					<div className='mt-6 sm:mt-8'>
						<Link
							to='signup'
							className='inline-block rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition duration-300 ease-in-out'
						>
							Registrera dig nu
						</Link>
					</div>
					{/* Mobile-only Login Button */}
					<div className='mt-4 md:hidden'>
						<Link
							to='login'
							className='inline-block rounded-md bg-red-700 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition duration-300 ease-in-out'
						>
							Logga in
						</Link>
					</div>
				</div>
				{/* Uncomment and adjust the image for mobile screens */}
				{/* <div className="flex-1 hidden md:block">
					<img
						src={HeroPicture}
						alt="Description of image"
						className="w-full h-auto max-h-64 object-contain rounded-lg"
					/>
				</div> */}
			</div>

			{/* Additional sections */}
			<TestMarquee direction='left' height='10rem' />
			<TestMarquee2 direction='right' height='14rem' />
			
			{/* BouncyCardsFeatures is hidden on mobile */}
			<div className='hidden md:block'>
				<BouncyCardsFeatures />
			</div>

			<Information />
			<TextParallaxContentExample />
			{/* <Footer /> */}
		</>
	);
}
