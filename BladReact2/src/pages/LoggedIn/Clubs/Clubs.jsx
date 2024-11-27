import React, { useState, useEffect } from 'react';
import { PageContainer } from '@/components/layout/PageContainer';
import ScrollableContainer from '@/components/Sections/ScrollableContainer';
import ClubCard from '@/components/ClubCard';
import { CardSkeleton } from '@/components/CardSkeleton';
import ClubHeroSection from '@/components/Sections/ClubHeroSection';
import { useNavigate } from 'react-router-dom';
import { Searchbar } from '@/components/Searchbar';
import { useAuthFetch } from '@/services/useAuthFetch';
import { VITE_AZURE_API_URL } from '@/services/api';
import BookClubCard from '@/components/Cards/BookClubCard';

export default function Clubs() {
	const [popularClubs, setPopularClubs] = useState([]);
	const [pagination, setPagination] = useState({
		totalCount: 0,
		totalPages: 0,
		currentPage: 1,
		itemsPerPage: 10,
		hasNextPage: false,
		hasPreviousPage: false,
	});
	const [searchResults, setSearchResults] = useState([]);
	const [userClubs, setUserClubs] = useState([]);
	const [friendsClubs, setFriendsClubs] = useState([]);
	const navigate = useNavigate();

	const { authFetch, isLoading } = useAuthFetch();
	const API_URL = VITE_AZURE_API_URL;

	const handleSearch = async (term) => {
		if (!term) {
			setSearchResults([]);
			return [];
		}
		try {
			const result = await authFetch(
				`${API_URL}/bookclubs/search?bookClubQuery=${term}`
			);
			const formattedResults = Array.isArray(result) ? result : [];
			setSearchResults(formattedResults);
			return formattedResults;
		} catch (error) {
			console.error('Error searching clubs:', error);
			setSearchResults([]);
			return [];
		}
	};

	useEffect(() => {
		const fetchAllClubs = async () => {
			try {
				// Fetch popular clubs
				const popularResult = await authFetch(
					`${API_URL}/bookclubs/popular?PageSize=10&PageIndex=1`
				);
				setPopularClubs(popularResult.data || []);
				setPagination({
					totalCount: popularResult.totalCount || 0,
					totalPages: popularResult.totalPages || 0,
					currentPage: popularResult.currentPage || 1,
					itemsPerPage: popularResult.itemsPerPage || 10,
					hasNextPage: popularResult.hasNextPage || false,
					hasPreviousPage: popularResult.hasPreviousPage || false,
				});

				// Fetch user's clubs
				const userClubsResult = await authFetch(`${API_URL}/bookclubs/user`);
				setUserClubs(userClubsResult.data || []);

				// Fetch friends' clubs
				const friendsClubsResult = await authFetch(
					`${API_URL}/bookclubs/friends`
				);
				setFriendsClubs(friendsClubsResult.data || []);
			} catch (error) {
				console.error('Error fetching clubs:', error);
			}
		};

		fetchAllClubs();
	}, [authFetch]);

	const handleClubClick = (clubId) => {
		navigate(`/clubs/${clubId}`);
	};

	const handleSelectClub = (club) => {
		handleClubClick(club.id);
	};

	return (
		<PageContainer>
			<ClubHeroSection />
			<div className='space-y-12 py-8'>
				<ScrollableContainer
					title='Populära bokklubbar'
					viewAllLink={{
						pathname: '/clubs/all',
						search: '?query=popular',
						state: { 
							apiUrl: `${API_URL}/bookclubs/popular?PageSize=20&PageIndex=1`,
							searchQuery: 'popular',
							pageSize: 20
						}
					}}
					itemWidth={300}
				>
					<div className='flex gap-6'>
						{isLoading ? (
							Array.from({ length: 4 }).map((_, index) => (
								<div key={index} className='w-[300px] flex-shrink-0'>
									<CardSkeleton />
								</div>
							))
						) : (
							popularClubs.map((club) => (
								<div 
									key={club.id} 
									className='w-[300px] flex-shrink-0'
									onClick={() => handleClubClick(club.id)}
								>
									<BookClubCard {...club} />
								</div>
							))
						)}
					</div>
				</ScrollableContainer>

				<ScrollableContainer
					title='Your Clubs'
					viewAllLink='/clubs/my-clubs'
					itemWidth={192}
				>
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => (
								<CardSkeleton key={`user-${index}`} />
						  ))
						: userClubs.map((club) => (
								<div
									onClick={() => handleClubClick(club.id)}
									key={club.id}
									className='py-4 px-2'
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
					{isLoading
						? Array.from({ length: 8 }).map((_, index) => (
								<CardSkeleton key={`friends-${index}`} />
						  ))
						: friendsClubs.map((club) => (
								<div
									onClick={() => handleClubClick(club.id)}
									key={club.id}
									className='py-4 px-2'
								>
									<ClubCard {...club} />
								</div>
						  ))}
				</ScrollableContainer>
			</div>
		</PageContainer>
	);
}
