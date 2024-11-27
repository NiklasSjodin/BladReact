import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { VITE_AZURE_API_URL } from '@/services/api';

const ClubHeroSection = () => {
	const navigate = useNavigate();
	const [isVisible, setIsVisible] = useState(() => {
		return localStorage.getItem('hideHero') !== 'true';
	});
	const API_URL = VITE_AZURE_API_URL;

	if (!isVisible) return null;

	const handleDismiss = () => {
		setIsVisible(false);
		localStorage.setItem('hideHero', 'true');
	};

	return (
		<div className='relative bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl'>
			<button
				onClick={handleDismiss}
				className='absolute top-4 right-4 z-10 text-white/80 hover:text-white
                         w-8 h-8 flex items-center justify-center
                         bg-black/20 hover:bg-black/30 rounded-full
                         transition-colors duration-200'
			>
				<X size={16} />
			</button>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24'>
				<div className='text-center space-y-8'>
					<h1 className='text-4xl md:text-5xl font-bold text-white'>
						Hitta din perfekta bokklubb
					</h1>
					<p className='text-xl md:text-2xl max-w-2xl mx-auto text-gray-200'>
						Anslut dig till en gemenskap av bokälskare. Diskutera, upptäck och
						dela din passion för läsning.
					</p>
					<div className='flex justify-center gap-4'>
						<Button
							onClick={() => navigate('/clubs/create')}
							className='bg-bladAccent hover:bg-bladAccent/90 text-white px-8 py-3'
						>
							Skapa bokklubb
						</Button>
						<Button
							onClick={() =>
								navigate('/clubs/all', {
									state: { apiUrl: `${API_URL}/bookclubs?ItemsPerPage=30` },
								})
							}
							variant='outline'
							className='bg-transparent border-2 border-white text-white hover:bg-white/10 px-8 py-3'
						>
							Utforska klubbar
						</Button>
					</div>
					<div className='mt-8 text-sm text-gray-300'>
						<p>
							Redan medlem i en bokklubb?{' '}
							<a href='/clubs/my-clubs' className='underline hover:text-white'>
								Se dina klubbar
							</a>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ClubHeroSection;
