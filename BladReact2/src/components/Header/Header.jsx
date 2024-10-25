import { useEffect, useState } from "react";
import {Link} from 'react-router-dom'

export default function Header() {


	return (
		<header className='border-b-2 border-black pt-4'>
			<Link to="login">Login</Link>
			<Link to="signup">Sign Up</Link>
		</header>
	);
}
