import React, { useState, useEffect, useCallback } from 'react';
import { PageContainer } from '../../../components/layout/PageContainer';
import ScrollableContainer from '@/components/Sections/ScrollableContainer';
import ClubCard from '@/components/ClubCard';
import { CardSkeleton } from '../../../components/CardSkeleton';
import HeroSection from '../../../components/Sections/HeroSection';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import { Searchbar } from '@/components/Searchbar';

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
	const [searchResults, setSearchResults] = useState([]);
	const [searchTerm, setSearchTerm] = useState('');

	const debouncedSearch = useCallback(
		debounce(async (term) => {
			if (!term) {
				setSearchResults([]);
				return;
			}
			try {
				console.log('Searching for:', term);
				const response = await fetch(
					`https://localhost:7076/api/bookclubs/search?bookClubQuery=${term}`
				);
				
				// Check if response is ok and is JSON
				if (!response.ok) {
					console.log('Search response status:', response.status);
					setSearchResults([]);
					return;
				}

				// Check content type
				const contentType = response.headers.get("content-type");
				if (!contentType || !contentType.includes("application/json")) {
					console.log('Invalid content type:', contentType);
					setSearchResults([]);
					return;
				}

				const result = await response.json();
				console.log('Results:', result);
				setSearchResults(Array.isArray(result) ? result : []);
			} catch (error) {
				console.error('Error searching clubs:', error);
				setSearchResults([]);
			}
		}, 300),
		[]
	);

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

	const handleSelectClub = (club) => {
		handleClubClick(club.id);
	}

	return (
		<PageContainer>
			<HeroSection />
			<div className='space-y-8 pb-24'>
				<div className='pt-6 space-y-4'>
					<h1 className='text-3xl font-bold text-white'>Book Clubs</h1>
					<Searchbar 
						onSearch={debouncedSearch}
						searchResults={searchResults}
						onSelectClub={handleSelectClub}
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
