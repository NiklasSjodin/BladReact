import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookCover } from '../hooks/useBookCover';
import { CardSkeleton } from './CardSkeleton';

/**
 * Enhanced BookCard Component
 * Features:
 * - Image loading with fallback
 * - Hover effects (optional)
 * - Click navigation
 * - Loading state
 * - Error handling
 * @param {Object} props
 * @param {string} props.id - Book ID for navigation
 * @param {string} props.title - Book title
 * @param {string} props.author - Book author
 * @param {string} props.coverId - Cover image ID
 * @param {boolean} props.interactive - Enable hover effects and click (default: true)
 * @param {string} props.size - Card size variant ('sm', 'md', 'lg') (default: 'md')
 */
const BookCard = ({
	id,
	isbn,
	title,
	author,
	coverId,
	interactive = true,
	size = 'md',
	onClick,
}) => {
	const navigate = useNavigate();
	const { data: coverUrl, isLoading, isError } = useBookCover(
		!coverId?.startsWith('http') ? coverId : null
	);

	// Size variants
	const sizeClasses = {
		sm: 'w-32',
		md: 'w-48',
		lg: 'w-64',
	};

	if (isLoading) {
		return <CardSkeleton size={size} />;
	}

	const baseClasses = `flex-shrink-0 ${sizeClasses[size]} m-2 overflow-hidden`;
	const interactiveClasses = interactive ? 'cursor-pointer group' : '';

	const imageUrl = coverId?.startsWith('http') ? coverId : coverUrl;

	const handleClick = () => {
		if (onClick) {
			onClick();
		} else if (interactive) {
			if (isbn) {
				navigate(`/book/${isbn}`);
			} else if (id) {
				navigate(`/books/${id}`);
			} else {
				console.warn('No ISBN or ID available for navigation');
			}
		}
	};

	return (
		<div
			onClick={handleClick}
			className={`${baseClasses} ${interactiveClasses}`}
		>
			<div
				className={`relative aspect-[2/3] ${
					interactive ? 'transition-all duration-300 group-hover:scale-105' : ''
				}`}
			>
				<img
					src={imageUrl || '/api/placeholder/150/200'}
					alt={title}
					className='w-full h-full object-cover rounded-lg shadow-lg'
					onError={(e) => {
						e.target.src = '/api/placeholder/150/200';
					}}
				/>
				{interactive && (
					<div
						className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg'
					>
						<div className='absolute bottom-0 p-4 text-white'>
							<h3 className='font-bold truncate'>{title}</h3>
							<p className='text-sm text-gray-300 truncate'>{author}</p>
						</div>
					</div>
				)}
			</div>
			{!interactive && (
				<div className='mt-2 text-center'>
					<h3 className='font-medium text-sm truncate'>{title}</h3>
					<p className='text-xs text-gray-600 truncate'>{author}</p>
				</div>
			)}
		</div>
	);
};

export default BookCard;
