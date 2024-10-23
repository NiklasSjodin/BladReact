import BladLogo from '../Images/blad.png';
import GoogleLogo from '../Images/googlelogo.png';
import AppleLogo from '../images/applelogo.png'
import { Link } from 'react-router-dom'; // Lägg till detta om du använder Link

// Skapa en funktion för LogInPage-komponenten
function LogInPage() {
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <Link to="/">
        <img
            alt="Our logo, blad in text"
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
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Log In
              </button>
              <div className="text-white flex justify-center pt-5 font-bold">
                Or
              </div>
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
                src={AppleLogo}
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
