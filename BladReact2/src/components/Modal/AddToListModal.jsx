import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { VITE_AZURE_API_URL } from '../../services/api';

const AddToBookListModal = ({ userId, bookId, isOpen, onClose }) => {
	const [bookLists, setBookLists] = useState([]);
	const [selectedList, setSelectedList] = useState(null);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setLoading(true);
			axios
				.get(`${API_URL}/user/${userId}/booklist`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				})
				.then((response) => {
					setBookLists(response.data); // Sätt användarens listor
					setLoading(false);
				})
				.catch((error) => {
					console.error('Error fetching book lists:', error);
					setLoading(false);
				});
		}
	}, [isOpen, userId]);

	const handleAddToList = () => {
		if (!selectedList) {
			alert('Välj en lista att lägga till boken i!');
			return;
		}

		axios
			.post(
				`${API_URL}/booklist/${bookListId}/book`,
				{ bookId },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			)
			.then((response) => {
				alert('Boken har lagts till i listan!');
				onClose(); // Stäng modalen
			})
			.catch((error) => {
				console.error('Error adding book to list:', error);
				alert('Något gick fel när boken skulle läggas till i listan!');
			});
	};

	if (!isOpen) return null;

	return (
		<div className='modal-overlay' onClick={onClose}>
			<div className='modal-content' onClick={(e) => e.stopPropagation()}>
				<h2>Lägg till bok i lista</h2>
				{loading ? (
					<p>Laddar listor...</p>
				) : bookLists.length > 0 ? (
					<select
						className='w-full p-2 border rounded'
						onChange={(e) => setSelectedList(e.target.value)}
						value={selectedList}
					>
						<option value=''>Välj en lista</option>
						{bookLists.map((list) => (
							<option key={list.id} value={list.id}>
								{list.name}
							</option>
						))}
					</select>
				) : (
					<p className='text-red-500'>
						Inga listor kunde laddas. Försök igen senare.
					</p>
				)}
				<div className='mt-4'>
					<Button onClick={handleAddToList}>Lägg till i lista</Button>
					<Button onClick={onClose}>Stäng</Button>
				</div>
			</div>
		</div>
	);
};

export default AddToBookListModal;
