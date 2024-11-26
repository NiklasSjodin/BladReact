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
	const [userClubs, setUserClubs] = useState([]);
	const [friendsClubs, setFriendsClubs] = useState([]);
	const [isLoadingUserClubs, setIsLoadingUserClubs] = useState(true);
	const [isLoadingFriendsClubs, setIsLoadingFriendsClubs] = useState(true);

	const API_URL = 'https://blad-api.azurewebsites.net/api/';

	const debouncedSearch = useCallback(
		debounce(async (term) => {
			if (!term) {
				setSearchResults([]);
				return;
			}
			try {
				console.log('Searching for:', term);
				const response = await fetch(
					`${API_URL}bookclubs/search?bookClubQuery=${term}`
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
		const fetchAllClubs = async () => {
			setIsLoading(true);
			setIsLoadingUserClubs(true);
			setIsLoadingFriendsClubs(true);

			try {
				// Fetch popular clubs
				const popularResponse = await fetch(
					`${API_URL}bookclubs/popular?PageSize=10&PageIndex=1`
				);
				const popularResult = await popularResponse.json();
				setPopularClubs(popularResult.data);
				setPagination({
					totalCount: popularResult.totalCount,
					totalPages: popularResult.totalPages,
					currentPage: popularResult.currentPage,
					itemsPerPage: popularResult.itemsPerPage,
					hasNextPage: popularResult.hasNextPage,
					hasPreviousPage: popularResult.hasPreviousPage
				});

				// Fetch user's clubs
				const userClubsResponse = await fetch(`${API_URL}bookclubs/user`);
				const userClubsResult = await userClubsResponse.json();
				setUserClubs(userClubsResult.data || []);

				// Fetch friends' clubs
				const friendsClubsResponse = await fetch(`${API_URL}bookclubs/friends`);
				const friendsClubsResult = await friendsClubsResponse.json();
				setFriendsClubs(friendsClubsResult.data || []);

			} catch (error) {
				console.error('Error fetching clubs:', error);
			} finally {
				setIsLoading(false);
				setIsLoadingUserClubs(false);
				setIsLoadingFriendsClubs(false);
			}
		};

		fetchAllClubs();
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

				<ScrollableContainer
					title='Your Clubs'
					viewAllLink='/clubs/my-clubs'
					itemWidth={192}
				>
					{isLoadingUserClubs
						? Array.from({ length: 8 }).map((_, index) => (
								<CardSkeleton key={`user-${index}`} />
						  ))
						: userClubs.map((club) => (
								<div 
									onClick={() => handleClubClick(club.id)} 
									key={club.id}
									className="py-4 px-2"
								>
									<ClubCard {...club} />
								</div>
						  ))}
				</ScrollableContainer>

				<ScrollableContainer
					title='Friends'
					viewAllLink='/clubs/friends'
					itemWidth={192}
				>
					{isLoadingFriendsClubs
						? Array.from({ length: 8 }).map((_, index) => (
								<CardSkeleton key={`friends-${index}`} />
						  ))
						: friendsClubs.map((club) => (
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
