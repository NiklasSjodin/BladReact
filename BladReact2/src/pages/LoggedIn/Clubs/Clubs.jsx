import React, { useState, useEffect } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import ScrollableContainer from '@/components/Sections/ScrollableContainer';
import ClubCard from '@/components/ClubCard';
import { CardSkeleton } from '../../../components/CardSkeleton';
import HeroSection from '../../../components/Sections/HeroSection';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

export default function Clubs() {
	const [popularClubs, setPopularClubs] = useState([]);
	const [pagination, setPagination] = useState({
		totalCount: 0,
		totalPages: 0,
		currentPage: 1,
		itemsPerPage: 10,
		hasNextPage: false,
		hasPreviousPage: false
	});
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	const debouncedSearch = debounce(async (term) => {
		if (!term) {
			setSearchResults([]);
			return;
		}
		try {
			const response = await fetch(
				`https://localhost:7076/api/bookclubs?searchterm=${term}&PageIndex=1&PageSize=10`
			);
			const result = await response.json();
			setSearchResults(result);
		} catch (error) {
			console.error('Error searching clubs:', error);
		}
	}, 300);

	useEffect(() => {
		const API_URL = 'https://localhost:7076';
		const fetchPopularClubs = async () => {
			setIsLoading(true);
			try {
				const response = await fetch(
					`${API_URL}/api/bookclubs/popular?PageSize=10&PageIndex=1`
				);
				const result = await response.json();
				setPopularClubs(result.data);
				setPagination({
					totalCount: result.totalCount,
					totalPages: result.totalPages,
					currentPage: result.currentPage,
					itemsPerPage: result.itemsPerPage,
					hasNextPage: result.hasNextPage,
					hasPreviousPage: result.hasPreviousPage
				});
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
					<input
						type="text"
						placeholder="Search book clubs..."
						className="w-full p-4 rounded-lg"
						onChange={(e) => {
							setSearchTerm(e.target.value);
							debouncedSearch(e.target.value);
						}}
					/>

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
								<div 
									onClick={() => handleClubClick(club.id)} 
									key={club.id}
									className="py-4 px-2"
								>
									<ClubCard {...club} />
								</div>
						  ))}
				</ScrollableContainer>
			</div>
		</PageContainer>
	);
}
