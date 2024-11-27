import React, { useState } from 'react';
import { X } from 'lucide-react';

const ExploreHeroSection = () => {
    const [isVisible, setIsVisible] = useState(() => {
        return localStorage.getItem('hideExploreHero') !== 'true';
    });

    if (!isVisible) return null;

    const handleDismiss = () => {
        setIsVisible(false);
        localStorage.setItem('hideExploreHero', 'true');
    };

    return (
        <div className='relative h-[300px] mb-8 rounded-xl overflow-hidden'>
            <button
                onClick={handleDismiss}
                className='absolute top-4 right-4 z-10 text-white/80 hover:text-white
                         w-8 h-8 flex items-center justify-center
                         bg-black/20 hover:bg-black/30 rounded-full
                         transition-colors duration-200'
            >
                <X size={16} />
            </button>
            <div className='absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600' />
            <div className="absolute inset-0 bg-[url('/hero-pattern.png')] opacity-10" />
            <div className='relative h-full flex items-center px-8'>
                <div className='max-w-2xl'>
                    <h1 className='text-4xl font-bold text-white pb-6'>
                        Utforska bokvärlden
                    </h1>
                    <p className='text-xl max-w-2xl mx-auto text-gray-200 pb-10'>
                        Hitta din nästa favoritbok bland våra handplockade genrer och rekommendationer
                    </p>
                    <button
                        onClick={() => window.scrollTo({ top: 400, behavior: 'smooth' })}
                        className='bg-white text-blue-600 px-6 py-2 rounded-lg
                                 hover:bg-blue-50 transition-colors duration-200'
                    >
                        Utforska genrer
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ExploreHeroSection; 