import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
	return (
		<footer className='w-full border-t border-black pt-4 pb-8 bg-slate-600'>
			<div className='container mx-auto px-4 md:px-6 lg:px-8'>
				<nav className='max-w-7xl mx-auto'>
					<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-6'>
						{/* Navigation Links */}
						<ul className='flex flex-wrap gap-x-6 gap-y-2'>
							<li>
								<Link
									to='/about'
									className='transition-colors hover:text-foreground/80 text-foreground/60'
								>
									About
								</Link>
							</li>
							<li>
								<Link
									to='/welcome'
									className='transition-colors hover:text-foreground/80 text-foreground/60'
								>
									Help
								</Link>
							</li>
							<li>
								<Link
									to='/privacy'
									className='transition-colors hover:text-foreground/80 text-foreground/60'
								>
									Privacy
								</Link>
							</li>
							<li>
								<Link
									to='/terms'
									className='transition-colors hover:text-foreground/80 text-foreground/60'
								>
									Terms
								</Link>
							</li>
							<li>
								<Link
									to='/contact'
									className='transition-colors hover:text-foreground/80 text-foreground/60'
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
								className='text-foreground/60 hover:text-foreground/80 transition-colors'
							>
								<Github size={20} />
							</a>
							<a
								href='https://linkedin.com/in/yourusername'
								target='_blank'
								rel='noopener noreferrer'
								className='text-foreground/60 hover:text-foreground/80 transition-colors'
							>
								<Linkedin size={20} />
							</a>
							<a
								href='mailto:your@email.com'
								className='text-foreground/60 hover:text-foreground/80 transition-colors'
							>
								<Mail size={20} />
							</a>
						</div>
					</div>

					{/* Copyright */}
					<div className='mt-6 flex justify-center md:justify-between items-center text-sm text-foreground/60'>
						<p>&copy; 2024 blad. Group. All rights reserved.</p>
						{/* <p className="hidden md:block">Made with ♥️ in Sweden</p> */}
					</div>
				</nav>
			</div>
		</footer>
	);
};

export default Footer;
