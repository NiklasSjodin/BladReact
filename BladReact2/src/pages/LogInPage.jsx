import { useState } from 'react';
import BladLogo from '../Images/blad.png';
import GoogleLogo from '../Images/googlelogo.png';
import { Link, useNavigate } from 'react-router-dom';

function LogInPage() {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [emailLocked, setEmailLocked] = useState(false);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
 	const API_URL = 'https://localhost:7076/';

	const handleNext = async () => {
		if (!email) {
			setError('Please enter an email address');
			return;
		}

		setError('');
		setShowPassword(true);
		setEmailLocked(true);
	};

	const handleBack = () => {
		setShowPassword(false);
		setEmailLocked(false);
		setError('');
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError('');
		setIsLoading(true);

		try {
			const response = await fetch(`${API_URL}api/accounts/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
					password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				// Store the token in localStorage or a secure storage method
				localStorage.setItem('token', data.token);
				// Redirect to dashboard or home page
				navigate('/');
			} else if (response.status === 423) {
				setError(data.message);
				handleBack(); // Reset to email step when account is locked
			} else {
				setError(data.message);
			}
		} catch (err) {
			setError('An error occurred. Please try again.', err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-red-900'>
			<div className='sm:mx-auto sm:w-full sm:max-w-sm'>
				<Link to='/'>
					<img
						alt='Your Company'
						src={BladLogo}
						className='mx-auto h-40 w-auto'
					/>
				</Link>
				<h2 className='mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-white'>
					Log in
				</h2>
			</div>

			<div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					{error && (
						<div className='p-3 text-sm text-white bg-red-600 rounded-md'>
							{error}
						</div>
					)}

					<div>
						<label
							htmlFor='email'
							className='block text-sm font-medium leading-6 text-white'
						>
							Email address
						</label>
						<div className='mt-2'>
							<input
								id='email'
								name='email'
								type='email'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								disabled={emailLocked}
								className='block w-full rounded-md border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
							/>
						</div>
					</div>

					{showPassword && (
						<div>
							<div className='flex items-center justify-between'>
								<label
									htmlFor='password'
									className='block text-sm font-medium leading-6 text-white'
								>
									Password
								</label>
								<div className='text-sm'>
									<a
										href='#'
										className='font-semibold text-white hover:text-indigo-500'
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className='mt-2'>
								<input
									id='password'
									name='password'
									type='password'
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									required
									className='block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
								/>
							</div>
						</div>
					)}

					{showPassword && (
						<button
							type='button'
							onClick={handleBack}
							className='flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300'
						>
							Back
						</button>
					)}

					{!showPassword ? (
						<button
							type='button'
							onClick={handleNext}
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
						>
							Next
						</button>
					) : (
						<button
							type='submit'
							disabled={isLoading}
							className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400'
						>
							{isLoading ? 'Logging in...' : 'Log In'}
						</button>
					)}
				</form>

				<div className='text-white flex justify-center pt-5 font-bold'>Or</div>

				<div className='mt-6'>
					<button
						type='button'
						className='flex w-full justify-center items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm ring-1 ring-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300'
					>
						<img src={GoogleLogo} alt='Google Logo' className='h-5 w-5 mr-2' />
						Sign in with Google
					</button>
				</div>

				<div className='mt-2'>
					<button
						type='button'
						className='flex w-full justify-center items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black'
					>
						<img
							src='https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
							alt='Apple Logo'
							className='h-5 w-5 mr-2'
						/>
						Sign in with Apple
					</button>
				</div>

				<p className='mt-10 text-center text-sm text-white'>
					Dont have an account?{' '}
					<Link
						to='/signup'
						className='font-semibold leading-6 text-white hover:text-indigo-500'
					>
						Sign Up
					</Link>
				</p>
			</div>
		</div>
	);
}

export default LogInPage;
