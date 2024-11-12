import { useEffect, useState } from "react";
import {Button} from '../ui/button'
import { Link } from 'react-router-dom';
import logo from "../../images/books.png";

export default function Header() {
	return (
		<header className='pt-1 pb-1 bg-slate-600'>
			<div className='px-4 h-12 flex items-center'>
				<img
					src={logo}
					alt='Description of image'
					className='h-8 w-auto object-contain pr-1'
				/>
				<div className='flex-1 font-comico'>blad.</div>
				
				<div>
					<Button variant='outline'>
						<Link to='/login'>Login</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
