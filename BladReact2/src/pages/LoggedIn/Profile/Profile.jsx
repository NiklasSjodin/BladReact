import { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { VITE_AZURE_API_URL } from '../../../services/api';

const ProfilePage = () => {
	const [userProfile, setUserProfile] = useState(null); // För att lagra användarens profil
	const API_URL = VITE_AZURE_API_URL;

	useEffect(() => {
		const fetchUserData = async () => {
			const token = localStorage.getItem('token');

			if (token) {
				try {
					// Dekodera token och hämta userId
					const decodedToken = jwtDecode(token);
					console.log('Dekodad token payload:', decodedToken); // Lägg till denna rad
					const userId =
						decodedToken[
							'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
						];

					if (!userId) {
						console.error('Användar-ID saknas i token.');
						return;
					}

					// Hämta användarens profildata från API
					const profileResponse = await axios.get(
						`${API_URL}/userprofile/${userId}`,
						{
							headers: {
								Authorization: `Bearer ${token}`,
							},
						}
					);
					setUserProfile(profileResponse.data);
				} catch (error) {
					console.error('Fel vid hämtning av användardata:', error);
				}
			} else {
				console.error('Ingen token hittades i localStorage.');
			}
		};

		fetchUserData(); // Kör logiken för att hämta användardata
	}, []); // Tom dependency array eftersom userId hämtas inuti useEffect

	// Visa loading state tills användardata är hämtad
	if (!userProfile) {
		return <div>Laddar...</div>;
	}

	return (
		<div className='flex flex-col items-center p-4 md:p-8 bg-bladLightBackground dark:bg-bladDarkBackground'>
			{/* Profilsektion */}
			<div className='w-full max-w-4xl bg-bladLightFields2 dark:bg-bladDarkFields shadow-md rounded-lg p-6'>
				<div className='flex flex-col md:flex-row items-center gap-6'>
					{/* Profilbild */}
					<div className='w-32 h-32 rounded-full bg-gray-300 overflow-hidden'>
						<img
							src={userProfile.imageUrl || 'https://via.placeholder.com/150'} // Använd profilbilden från API eller en fallback
							alt='Profile'
							className='w-full h-full object-cover'
						/>
					</div>
					{/* Namn och bio */}
					<div className='text-center md:text-left text-bladLightTextColor dark:text-bladDarkTextColor'>
						<h1 className='text-2xl font-bold dark  text-bladLightTextColor dark:text-bladDarkTextColor'>
							{userProfile.name}
						</h1>{' '}
						{/* Använd användarnamn från API */}
						<p className='text-bladLightTextColor dark:text-bladDarkTextColor mt-2 '>
							{userProfile.bio}
						</p>{' '}
						{/* Använd användarbio från API */}
					</div>
				</div>
			</div>

			{/* Boklistor */}
			<div className='w-full max-w-4xl mt-6 bg-white dark:bg-bladDarkFields shadow-md rounded-lg p-6'>
				<h2 className='text-xl font-semibold mb-4'>Mina Boklistor</h2>
				<ul className='space-y-3'>
					<li className='bg-bladLightFields dark:bg-bladDarkFields2 text-bladLightTextColor dark:text-bladDarkTextColor p-3 rounded-md'>
						Vill läsa
					</li>
					<li className='bg-bladLightFields dark:bg-bladDarkFields2 text-bladLightTextColor dark:text-bladDarkTextColor p-3 rounded-md'>
						Läser just nu
					</li>
					<li className='bg-bladLightFields dark:bg-bladDarkFields2 text-bladLightTextColor dark:text-bladDarkTextColor p-3 rounded-md'>
						Har läst
					</li>
				</ul>
			</div>

			{/* Vänner/Följare/Följer */}
			<div className='w-full max-w-4xl mt-6 bg-bladLightFields2 dark:bg-bladDarkFields shadow-md rounded-lg p-6'>
				<h2 className='text-xl font-semibold mb-4'>Följare</h2>
				<div className='flex gap-8'>
					<div className='text-center'>
						<h3 className='text-2xl font-bold'>{userProfile.followersCount}</h3>
						<p className='text-bladLightTextColor dark:text-bladDarkTextColor'>
							Följer
						</p>
					</div>
					<div className='text-center'>
						<h3 className='text-2xl font-bold'>{userProfile.followersCount}</h3>
						<p className='text-bladLightTextColor dark:text-bladDarkTextColor'>
							Följare
						</p>
					</div>
				</div>
			</div>

			{/* Recensioner */}
			<div className='w-full max-w-4xl mt-6 bg-bladLightFields2 dark:bg-bladDarkFields shadow-md rounded-lg p-6'>
				<h2 className='text-xl font-semibold mb-4'>Mina Recensioner</h2>
				<div className='space-y-4'>
					<div className='bg-bladLightFields2 dark:bg-bladDarkFields2 p-4 rounded-md'>
						<h3 className='font-bold text-bladLightTextColor dark:text-bladDarkTextColor'>
							Bokens titel
						</h3>
						<p className='text-bladLightTextColor dark:text-bladDarkTextColor mt-1'>
							En kort recension. Exempeltext för hur en recension skulle kunna
							se ut.
						</p>
					</div>
					<div className='bg-bladLightFields2 dark:bg-bladDarkFields2 p-4 rounded-md'>
						<h3 className='font-bold text-bladLightTextColor dark:text-bladDarkTextColor'>
							Bokens titel
						</h3>
						<p className='text-bladLightTextColor dark:text-bladDarkTextColor mt-1'>
							En kort recension. Exempeltext för hur en recension skulle kunna
							se ut.
						</p>
					</div>
				</div>
			</div>

			{/* Bokklubbar */}
			<div className='w-full max-w-4xl mt-6 bg-bladLightFields2 dark:bg-bladDarkFields shadow-md rounded-lg p-6'>
				<h2 className='text-xl font-semibold mb-4'>Mina Bokklubbar</h2>
				<ul className='space-y-3'>
					<li className='bg-bladLightFields dark:bg-bladDarkFields2 text-bladLightTextColor dark:text-bladDarkTextColor p-3 rounded-md'>
						Bokklubb 1
					</li>
					<li className='bg-bladLightFields dark:bg-bladDarkFields2 text-bladLightTextColor dark:text-bladDarkTextColor p-3 rounded-md'>
						Bokklubb 2
					</li>
				</ul>
			</div>
		</div>
	);
};

export default ProfilePage;
