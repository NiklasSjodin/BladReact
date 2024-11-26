import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { BsSearch, BsGrid, BsListUl } from 'react-icons/bs';
import { PageContainer } from '../../../components/layout/PageContainer';
import { Production_API_URL } from '../../../services/api';

export default function Library() {
	const [bookLists, setBookLists] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const [isGridView, setIsGridView] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const userId = '8ea44371-291d-4dc9-27f8-08dd03e02487';
	const API_URL = Production_API_URL;

	useEffect(() => {
		const fetchBookLists = async () => {
			try {
				setIsLoading(true);
				const response = await fetch(`${API_URL}/user/${userId}/booklist`);
				if (!response.ok) {
					throw new Error('Failed to fetch booklists');
				}
				const data = await response.json();
				setBookLists(data);
			} catch (error) {
				setError(error.message);
				console.error('Error fetching booklists:', error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchBookLists();
	}, [userId]);

	const filteredLists = bookLists.filter(list =>
		list.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	if (isLoading) {
		return (
			<PageContainer>
				<div className="flex justify-center items-center h-screen">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
				</div>
			</PageContainer>
		);
	}

	if (error) {
		return (
			<PageContainer>
				<div className="flex justify-center items-center h-screen">
					<div className="text-red-500 text-center">
						<h2 className="text-xl font-bold mb-2">Error</h2>
						<p>{error}</p>
					</div>
				</div>
			</PageContainer>
		);
	}

	return (
		<PageContainer>
			<div className='space-y-8 pb-24'>
				<div className='pt-6 space-y-4'>
					<h1 className='text-3xl font-bold text-bladLightTextColor'>My Library</h1>
					<div className='flex mb-4'>
						<div className='flex items-center border rounded-l-md border-r-0 border-gray-200 bg-white'>
							<div className='p-2'>
								<BsSearch className='text-gray-400' />
							</div>
							<input
								type='text'
								placeholder='Search'
								className='border border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-r-md pl-4 pr-4 text-sm text-gray-900'
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</div>
						<div className='flex items-center border rounded-r-md border-l-0 border-gray-200 bg-white'>
							<button
								className='p-2 text-gray-600 hover:text-gray-800'
								onClick={() => setIsGridView(!isGridView)}
							>
								{isGridView ? <BsGrid className='text-gray-400' /> : <BsListUl className='text-gray-400' />}
							</button>
						</div>
					</div>
					<div className={`grid ${isGridView ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-4`}>
						{filteredLists.map((list) => (
							<div key={list.id} className='p-4 border rounded-lg shadow bg-gray-800'>
								<h2 className='text-xl font-semibold text-white'>{list.name}</h2>
								<Link 
									to={`/booklist/${list.id}`} 
									className='text-blue-400 hover:text-blue-300'
								>
									View Books →
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>
		</PageContainer>
	);
}
