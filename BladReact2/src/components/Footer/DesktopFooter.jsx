import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
	return (
		<footer className='w-full pt-4 pb-8 bg-bladtheme'>
			<div className='container mx-auto px-4 md:px-6 lg:px-8'>
				<nav className='max-w-7xl mx-auto'>
					<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-6'>
						{/* Navigation Links */}
						<ul className='flex flex-wrap gap-x-6 gap-y-2'>
							<li>
								<Link
									to='/about'
									className='transition-colors hover:text-foreground/80 text-foreground/60 text-white'
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to='/welcome'
									className='transition-colors hover:text-foreground/80 text-foreground/60 text-white'
								>
									Help
								</Link>
							</li>
							<li>
								<Link
									to='/privacy'
									className='transition-colors hover:text-foreground/80 text-foreground/60 text-white'
								>
									Privacy
								</Link>
							</li>
							<li>
								<Link
									to='/terms'
									className='transition-colors hover:text-foreground/80 text-foreground/60 text-white'
								>
									Terms
								</Link>
							</li>
							<li>
								<Link
									to='/contact'
									className='transition-colors hover:text-foreground/80 text-foreground/60 text-white'
								>
									Contact
								</Link>
							</li>
						</ul>

						{/* Social Icons */}
						<div className='flex space-x-4'>
							<a
								href='https://github.com/yourusername'
								target='_blank'
								rel='noopener noreferrer'
								className='text-foreground/60 hover:text-foreground/80 transition-colors text-white'
							>
								<Github size={20} />
							</a>
							<a
								href='https://linkedin.com/in/yourusername'
								target='_blank'
								rel='noopener noreferrer'
								className='text-foreground/60 hover:text-foreground/80 transition-colors text-white'
							>
								<Linkedin size={20} />
							</a>
							<a
								href='mailto:your@email.com'
								className='text-foreground/60 hover:text-foreground/80 transition-colors text-white'
							>
								<Mail size={20} />
							</a>
						</div>
					</div>

					{/* Copyright */} 
					<div className='mt-6 flex justify-center md:justify-between items-center text-sm text-foreground/60 text-white'>
						<p>&copy; 2024 blad. Group. All rights reserved.</p>
						{/* <p className="hidden md:block">Made with ♥️ in Sweden</p> */}
					</div>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
