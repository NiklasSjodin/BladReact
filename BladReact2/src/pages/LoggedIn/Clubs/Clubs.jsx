import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import ScrollableContainer from '@/components/Sections/ScrollableContainer';
import ClubCard from '@/components/ClubCard';
import { CardSkeleton } from '../../../components/CardSkeleton';
import HeroSection from '../../../components/Sections/HeroSection';
import { useNavigate } from 'react-router-dom';

export default function Clubs() {
	const [popularClubs, setPopularClubs] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchPopularClubs = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					'https://localhost:7076/api/bookclubs/popular'
				);
				const result = await response.json();
				setPopularClubs(result.data);
			} catch (error) {
				console.error('Error fetching clubs:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPopularClubs();
	}, []);

	const handleClubClick = (clubId) => {
		navigate(`/clubs/${clubId}`);
	};

	return (
		<PageContainer>
			<HeroSection />
			<div className='space-y-8 pb-24'>
				<div className='pt-6 space-y-4'>
					<h1 className='text-3xl font-bold text-white'>Book Clubs</h1>
					<p className='text-gray-400'>Join a community of readers</p>
				</div>

				<ScrollableContainer
					title='Popular Clubs'
					viewAllLink='/clubs/popular'
					itemWidth={192}
				>
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => (
								<CardSkeleton key={index} />
						  ))
						: popularClubs.map((club) => (
								<div onClick={() => handleClubClick(club.id)} key={club.id}>
									<ClubCard {...club} />
								</div>
						  ))}
				</ScrollableContainer>
			</div>
		</PageContainer>
	);
}
