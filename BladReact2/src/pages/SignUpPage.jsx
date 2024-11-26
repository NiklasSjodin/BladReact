import React, { useState } from 'react';
import BladLogo from '../images/blad.png';
import GoogleLogo from '../images/googlelogo.png'
import AppleLogo from '../images/applelogo.png'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const API_URL = "https://localhost:7076/api/accounts/register";

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const[fullName, setFullName] = useState('');
  const[userName, setUserName] = useState('');
  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');

  async function handleSubmit(e)
    {
        e.preventDefault(); // Förhindrar siduppdatering när formuläret skickas
        
        try{
            const newUser = 
        {
            fullName, userName, email, password
        }
        console.log(newUser); // Log to see if all fields are correct
            const response = await axios.post('https://localhost:7076/api/accounts/register', newUser) // POST förfrågan till vårt API
            console.log('New user created: ', response.data) // Loggar svaret om det fungerade

            if (response.status === 200) {
              // Store the token in localStorage or a secure storage method
              localStorage.setItem('token', response.data.token);
              // Redirect to dashboard or home page
              navigate('/home');
            } else if (response.status === 423) {
              setError(response.data.message);
              handleBack(); // Reset to email step when account is locked
            } else {
              setError(data.message);
            }
        }catch(error){
          if (error.response) {
            console.log('Error response:', error.response.data);  // Logs backend error details
            console.log('Error status:', error.response.status);
          } else if (error.request) {
            console.log('Error request:', error.request);
          } else {
            console.log('Error message:', error.message);
          }
        }
    }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-bladtheme">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/" className='flex items-center justify-center font-general text-8xl pb-2'>
          blad.
          </Link>
          <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-white">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium leading-6 text-white"
              >
                Full Name
              </label>
              <div className="mt-2">
                <input
                  id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="userName"
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 text-white font-bold text-xs">
              <input
                type="checkbox"
                id="termsCheckbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="termsCheckbox">
                By selecting Create Account below, I agree to{' '}
                <a href="/termsofservice" className="underline" target="_blank">
                  Terms of Service
                </a>{' '}
                &{' '}
                <a href="/privacy" className="underline" target="_blank">
                  Privacy Policy
                </a>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
                disabled={!isChecked} // Disable until checkbox is checked
              >
                Create Account
              </button>
              <div className="text-white flex justify-center pt-5 font-bold">
                Or
              </div>
            </div>
          </form>

          <div className="mt-6">
            <button
              type="button"
              className="flex w-full justify-center items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <img src={GoogleLogo} alt="Google Logo" className="h-5 w-5 mr-2" />
              Sign in with Google
            </button>
          </div>

          <div className="mt-2">
            <button
              type="button"
              className="flex w-full justify-center items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <img
                src={AppleLogo}
                alt="Apple Logo"
                className="h-5 w-5 mr-2"
              />
              Sign in with Apple
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-white">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-semibold leading-6 text-white hover:text-indigo-500"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
