import React, { useState } from 'react'; 
import BladLogo from '../Images/blad.png';
import GoogleLogo from '../Images/googlelogo.png';
import { Link } from 'react-router-dom'; 

// Create a function for the LogInPage component
function LogInPage() {
  const [email, setEmail] = useState(''); // State for email
  const [showPassword, setShowPassword] = useState(false); // State to control password visibility
  const [emailLocked, setEmailLocked] = useState(false); // State to lock email

  const handleNext = () => {
    setShowPassword(true); // Show the password field
    setEmailLocked(true); // Lock the email field
  };

  const handleBack = () => {
    setShowPassword(false); // Hide the password field
    setEmailLocked(false); // Unlock the email field
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-red-900">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <img
              alt="Your Company"
              src={BladLogo}
              className="mx-auto h-40 w-auto"
            />
          </Link>
          <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-white">
            Log in
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-white"
              >
                Email address
              </label>
              <div className="mt-2 m">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)} // Update email state
                  required
                  autoComplete="email"
                  disabled={emailLocked} // Lock the field if email is locked
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Conditionally render the password field */}
            {showPassword && (
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-white hover:text-indigo-500"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            )}

            {/* Back button to go back to the email field */}
            {showPassword && (
              <div>
                <button
                  type="button" // Use button type instead of submit
                  onClick={handleBack} // Handle the back button click
                  className="flex w-full justify-center rounded-md bg-gray-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
                >
                  Back
                </button>
              </div>
            )}

            {/* Next button to show password field */}
            {!showPassword && (
              <div>
                <button
                  type="button" // Use button type instead of submit
                  onClick={handleNext} // Handle the next button click
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Next
                </button>
              </div>
            )}

            {/* Submit button for login */}
            {showPassword && (
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log In
                </button>
              </div>
            )}

            <div className="text-white flex justify-center pt-5 font-bold">
              Or
            </div>
          </form>

          <div className="mt-6">
            <button
              type="button"
              className="flex w-full justify-center items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm ring-1 ring-gray-300 hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
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
                src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                alt="Apple Logo"
                className="h-5 w-5 mr-2"
              />
              Sign in with Apple
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-white">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-semibold leading-6 text-white hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
