import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';
import logo from '../../images/books.png';

export default function LoggedInHeader() {
	return (
		<header className='pt-1 pb-1 bg-slate-600'>
			<div className='px-4 h-12 flex items-center'>
				<img
					src={logo}
					alt='Description of image'
					className='h-8 w-auto object-contain pr-1'
				/>
				<div className='flex-1 font-comico'>blad.</div>
				
				<div className='flex items-center space-x-4 ml-auto px-2'>
					<Link to='/clubs'>Clubs</Link>
					<Link to='/explore'>Explore</Link>
					<Link to='/library'>Bibliotek</Link>
				</div>

				<div className='flex items-center space-x-4 ml-auto pl-2'>
					<input
						type='text'
						placeholder='Sökbar för allt?'
						className='border rounded-md px-2 py-1'
					/>
					<Avatar>
						<AvatarImage src='/path/to/avatar.jpg' alt='User Avatar' />
						<AvatarFallback>U</AvatarFallback>
					</Avatar>
					<Link to='/account'>Username</Link>
				</div>
			</div>
		</header>
	);
}
