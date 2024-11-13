import React from 'react';

const BookCard = ({ title, author, coverId }) => {
	const coverUrl = coverId
		? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
		: '/api/placeholder/150/200';

	return (
		<div className='flex-shrink-0 w-48 h-64 m-2 rounded-lg bg-gray-200 flex flex-col items-center justify-center p-2'>
			<img
				src={coverUrl}
				alt={title}
				className='w-full h-48 object-cover rounded'
			/>
			<p className='mt-2 text-sm text-center font-medium truncate w-full'>
				{title}
			</p>
			<p className='mt-1 text-xs text-center text-gray-600 truncate w-full'>
				{author}
			</p>
		</div>
	);
};

export default BookCard;
