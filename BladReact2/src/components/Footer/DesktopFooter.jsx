import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer className="w-full h-40 border-t-2 border-black pt-4">
			<nav className="container mx-auto flex justify-between items-center">
				<p>&copy; 2024 blad.</p>
				<ul className="flex space-x-4">
					<li>
						<Link
							to=""
							target="_blank"
							rel="noopener noreferrer"
							title="link to github"
						>
							<i className="fa-brands fa-github"></i>
						</Link>
					</li>
					<li>
						<Link
							to=""
							target="_blank"
							rel="noopener noreferrer"
							title="link to linkedin"
						>
							<i className="fa-brands fa-linkedin"></i>
						</Link>
					</li>
					<li>
						<Link
							to=""
							target="_blank"
							rel="noopener noreferrer"
							title="link to instagram"
						>
							<i className="fa-brands fa-instagram"></i>
						</Link>
					</li>
				</ul>
			</nav>
		</footer>
	);
};

export default Footer;
