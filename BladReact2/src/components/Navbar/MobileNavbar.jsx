import { Link } from 'react-router-dom';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Home, Users, Lightbulb, BookOpen, User } from 'lucide-react';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

const MobileNavbar = () => {
	const navItems = [
		{ to: 'home', title: 'Home', icon: <Home className='h-5 w-5' /> },
		{ to: 'clubs', title: 'Clubs', icon: <Users className='h-5 w-5' /> },
		{
			to: 'explore',
			title: 'Explore',
			icon: <Lightbulb className='h-5 w-5' />,
		},
		{ to: 'books', title: 'Books', icon: <BookOpen className='h-5 w-5' /> },
		{
			to: 'profile',
			title: 'Profile',
			icon: (
				<Avatar className='h-6 w-6'>
					<AvatarImage src='/path/to/your/avatar.jpg' alt='Profile' />
					<AvatarFallback>
						<User className='h-4 w-4' />
					</AvatarFallback>
				</Avatar>
			),
		},
	];

	return (
		<footer className='fixed bottom-0 w-full border-t bg-white dark:bg-slate-950'>
			<TooltipProvider>
				<nav className='container mx-auto px-4'>
					<ul className='flex justify-between items-center h-16'>
						{navItems.map((item) => (
							<li key={item.to}>
								<Tooltip>
									<TooltipTrigger asChild>
										<Link to={item.to}>
											<Button
												variant='ghost'
												size='icon'
												className='relative hover:bg-slate-100 dark:hover:bg-slate-800'
											>
												{item.icon}
											</Button>
										</Link>
									</TooltipTrigger>
									<TooltipContent>
										<p>{item.title}</p>
									</TooltipContent>
								</Tooltip>
							</li>
						))}
					</ul>
				</nav>
			</TooltipProvider>
		</footer>
	);
};

export default MobileNavbar;