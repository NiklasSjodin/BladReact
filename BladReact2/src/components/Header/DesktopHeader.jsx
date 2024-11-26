import { useEffect, useState } from "react";
import {Button} from '../ui/button'
import { Link } from 'react-router-dom';
import logo from "../../images/books.png";

export default function Header() {
	return (
		<header className='pt-1 pb-1 bg-bladtheme'>
			<div className='px-4 h-12 flex items-center'>
				<img
					src={logo}
					alt='Description of image'
					className='h-8 w-auto object-contain pr-1'
				/>
				<div className='flex-1 font-general text-xl'>blad.</div>
				
				<div>
					<Button variant='outline' className='bg-white text-bladtheme'>
						<Link to='/login'>Login</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
