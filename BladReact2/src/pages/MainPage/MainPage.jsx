import { Link } from "react-router-dom";
import HeroPicture from "../../images/books.png";
import TestMarquee from '../../components/Sections/TestMarquee'
import Footer from "@/components/Footer/DesktopFooter";

export default function MainPage() {

  return (
		<>
		<div className="items-center justify-between px-5 lg:mx-auto lg:pl-32 py-24 sm:py-32 sm: lg:py-40 lg:flex bg-black">
        <div className="text-left flex-1 pr-8">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Skapa din perfekta bokhylla och dela dina favoriter
          </h1>
          <p className="mt-6 text-lg leading-8 text-white">
            Håll koll på din läsning och upptäck böcker som inspirerar. Med Blad är varje sida ett nytt äventyr att dela.
          </p>
          <div className="mt-8 flex items-center gap-x-6">
            <Link
              to="signup"
              className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-600 transition duration-300 ease-in-out"
            >
              Get started
            </Link>
          </div>
        </div>
        <div className="flex-1 hidden md:block">
          <img
            src={HeroPicture}
            alt="Description of image"
            className="w-full h-auto max-h-64 object-contain rounded-lg"
          />
        </div>
      </div>
	  {/* <BookCoversMarquee/> */}
    <TestMarquee 
          direction="left"
          height="10rem"
        />
    <TestMarquee 
          direction="right"
          height="8rem"
        />
    <Footer></Footer>
		</>
	);
}