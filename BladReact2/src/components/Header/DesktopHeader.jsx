import { useEffect, useState } from "react";
import {Button} from '../ui/button'
import { Link } from 'react-router-dom';

export default function Header() {


	return (
		<header className='border-b-2 border-black pt-1 pb-1'>
			<div className='container px-4 h-12 flex items-center justify-between'>
				<div className='ml-auto'>
					blad.
				</div>
				<div className='ml-auto'>
					<Button variant='outline'>
						<Link to='/login'>Login</Link>
					</Button>
				</div>
			</div>
		</header>
	);
}
