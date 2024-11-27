import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from '@/components/ui/dialog';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { VITE_AZURE_API_URL } from '../../services/api';

export default function UserProfileSettings() {
	const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
	const [userId, setUserId] = useState(null);
	const [userName, setUserName] = useState('');
	const [name, setName] = useState('');
	const [bio, setBio] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const [privacyLevel, setPrivacyLevel] = useState(0);
	const [currentPassword, setCurrentPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	const API_URL = VITE_AZURE_API_URL;

	useEffect(() => {
		const token = localStorage.getItem('token');
		console.log('Token som skickas:', localStorage.getItem('token'));

		if (token) {
			const decoded = jwtDecode(token);
			setUserId(
				decoded[
					'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
				]
			);
			setUserName(
				decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name']
			);
			axios
				.get(
					`${API_URL}/users/${decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier']}`,
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				)
				.then((response) => {
					console.log('User data fetched:', response.data);
					setName(response.data.name);
					setBio(response.data.bio);
					setImageUrl(response.data.imageUrl);
					setPrivacyLevel(response.data.privacyLevel);
				})
				.catch((error) => console.error('Error fetching user data:', error));
		}
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log('Formulär skickat');
		try {
			const updatedUser = { name, bio, imageUrl, privacyLevel }; // Inkludera värden för att uppdatera
			console.log('Data som skickas:', updatedUser); // Logga vad som skickas i updatedUser
			await axios.put(`${API_URL}/userprofile/${userId}`, updatedUser, {
				headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
			});
			console.log('Användarprofil uppdaterad.');
			alert('Din profil har uppdaterats!');
			window.location.reload();
		} catch (error) {
			console.error('Fel vid uppdatering av användarprofil:', error);
			if (error.response) {
				console.error('Response Error:', error.response);
			} else if (error.request) {
				console.error('Request Error:', error.request);
			} else {
				console.error('General Error:', error.message);
			}
		}
	};

	const changePassword = async (e) => {
		e.preventDefault();
		setLoading(true);
		setMessage('');
		try {
			const response = await axios.put(
				`${API_URL}/accounts/password`,
				{ currentPassword, newPassword },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
						'Content-Type': 'application/json',
					},
				}
			);
			setMessage('Lösenordet har uppdaterats.');
			alert('Ditt lösenord har uppdaterats!');
			window.location.reload();
		} catch (error) {
			if (error.response && error.response.data) {
				setMessage(error.response.data.message || 'Något gick fel.');
			} else {
				setMessage('Serverfel. Försök igen senare.');
			}
		} finally {
			setLoading(false);
		}
	};

	const handleDelete = async () => {
		if (!userId) return;
		try {
			await axios.delete(`${API_URL}/users/${userId}`, {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			});
			console.log('Kontot har tagits bort.');
			localStorage.removeItem('token');
			navigate('/');
		} catch (error) {
			console.error('Fel vid borttagning av kontot: ', error);
		}
	};

	return (
		<div className='min-h-screen bg-bladLightBackground text-bladLightTextColor px-4 py-6'>
			<div className='space-y-2'>
				{/* Ändra användarnamn */}
				<span>Ändra inställningar</span>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label htmlFor='name' className='block text-sm font-medium'>
							Användarnamn
						</label>
						<input
							type='text'
							id='name'
							value={name}
							onChange={(e) => setName(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-700 bg-bladLightFields text-bladLightTextColor rounded-lg'
							required
						/>
					</div>

					{/* Bio input */}
					<div className='mb-4'>
						<label htmlFor='bio' className='block text-sm font-medium'>
							Bio
						</label>
						<textarea
							id='bio'
							value={bio}
							onChange={(e) => setBio(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-700 bg-bladLightFields text-bladLightTextColor rounded-lg'
						/>
					</div>

					{/* Image URL input */}
					<div className='mb-4'>
						<label htmlFor='imageUrl' className='block text-sm font-medium'>
							Image URL
						</label>
						<input
							type='url'
							id='imageUrl'
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-700 bg-bladLightFields text-bladLightTextColor rounded-lg'
						/>
					</div>

					{/* Privacy Level input */}
					<div className='mb-4'>
						<label htmlFor='privacyLevel' className='block text-sm font-medium'>
							Integritetsnivå
						</label>
						<select
							id='privacyLevel'
							value={privacyLevel}
							onChange={(e) => setPrivacyLevel(Number(e.target.value))}
							className='mt-1 block w-full px-3 py-2 border border-gray-700 bg-bladLightFields text-bladLightTextColor rounded-lg'
						>
							<option value={0}>Privat</option>
							<option value={1}>Offentlig</option>
							<option value={2}>Endast vänner</option>
						</select>
					</div>

					<button
						type='submit'
						className='bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						Spara
					</button>
				</form>

				{/* Ändra lösenord */}
				<span className='flex items-center justify-between p-3 rounded-lg'>
					Ändra lösenord
				</span>
				<form onSubmit={changePassword}>
					<div className='mb-4'>
						<label
							htmlFor='currentPassword'
							className='block text-sm font-medium'
						>
							Nuvarande lösenord
						</label>
						<input
							type='password'
							id='currentPassword'
							value={currentPassword}
							onChange={(e) => setCurrentPassword(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-700 bg-bladLightFields text-bladLightTextColor rounded-lg'
							required
						/>
					</div>
					<div className='mb-4'>
						<label htmlFor='newPassword' className='block text-sm font-medium'>
							Nytt lösenord
						</label>
						<input
							type='password'
							id='newPassword'
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							className='mt-1 block w-full px-3 py-2 border border-gray-700 bg-bladLightFields text-bladLightTextColor rounded-lg'
							required
						/>
					</div>
					<button
						type='submit'
						disabled={loading}
						className='bg-gray-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
					>
						{loading ? 'Uppdaterar...' : 'Spara'}
					</button>
				</form>

				{/* Ta bort konto */}
				<Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
					<DialogTrigger asChild>
						<button
							className='flex items-center justify-between p-3 rounded-lg bg-red-800 hover:bg-red-700 transition duration-150 w-full'
							onClick={() => setIsDeleteDialogOpen(true)}
						>
							<span>Ta bort konto</span>
						</button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Ta bort konto</DialogTitle>
							<DialogDescription>
								Är du säker på att du vill ta bort ditt konto? Denna åtgärd kan
								inte ångras.
							</DialogDescription>
						</DialogHeader>
						<DialogFooter>
							<button
								className='bg-red-600 hover:bg-red-500 rounded-lg px-4 py-2'
								onClick={handleDelete}
							>
								Ta bort
							</button>
							<button
								className='bg-gray-200 hover:bg-gray-100 rounded-lg px-4 py-2 ml-2'
								onClick={() => setIsDeleteDialogOpen(false)}
							>
								Avbryt
							</button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
