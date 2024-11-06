import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';

export default function LoggedInHeader() {
	return (
		<header className='border-b-2 border-black pt-1 pb-1'>
			<div className='container px-4 h-12 flex items-center justify-between'>
				<div className='flex-1 text-center'>
					<Link to='/home'>
						<span>blad.</span>
					</Link>
				</div>
				<div className='flex items-center space-x-4 ml-auto px-2'>
					<Link to='/clubs'>Clubs</Link>
					<Link to='/explore'>Explore</Link>
					<Link to='/library'>Bibliotek</Link>
				</div>

				<div className='flex items-center space-x-4 ml-auto pl-2'>
					<input
						type='text'
						placeholder='Search...'
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
