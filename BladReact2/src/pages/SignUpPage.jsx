import React, { useState } from "react";
import BladLogo from "../Images/blad.png";
import GoogleLogo from "../images/googlelogo.png";
import AppleLogo from "../images/applelogo.png";
import { Link } from "react-router-dom";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
  });
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const API_URL = "https://localhost:7076/api/accounts/register";

  // Hantera ändringar i formulärfälten
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Hantera checkbox-ändring
  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  // Hantera formulärets inlämning
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(API_URL, {
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
        userName: formData.username,
      });

      if (response.status === 201) {
        // Om användaren skapades framgångsrikt, omdirigera eller visa ett meddelande
        alert("Account created successfully!");
      }
    } catch (error) {
      // Hantera felmeddelanden från backend
      if (error.response && error.response.status === 400) {
        setErrorMessage("Invalid input. Please check your information.");
      } else if (error.response && error.response.status === 409) {
        setErrorMessage("User already exists.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link to="/">
            <img
              alt="Your Company"
              src={BladLogo}
              className="mx-auto h-40 w-auto"
            />
          </Link>
          <h2 className="mt-10 text-left text-2xl font-bold leading-9 tracking-tight text-white">
            Sign up
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-white"
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-white"
              >
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-white shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
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
                By selecting Create Account below, I agree to{" "}
                <a href="/termsofservice" className="underline" target="_blank">
                  Terms of Service
                </a>{" "}
                &{" "}
                <a href="/privacy" className="underline" target="_blank">
                  Privacy Policy
                </a>
              </label>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-xs">{errorMessage}</p>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-400"
                disabled={!isChecked}
              >
                Create Account
              </button>
            </div>
          </form>
          <div className="mt-6">
            <button
              type="button"
              className="flex w-full justify-center items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <img
                src={GoogleLogo}
                alt="Google Logo"
                className="h-5 w-5 mr-2"
              />
              Sign in with Google
            </button>
          </div>

          <div className="mt-2">
            <button
              type="button"
              className="flex w-full justify-center items-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              <img src={AppleLogo} alt="Apple Logo" className="h-5 w-5 mr-2" />
              Sign in with Apple
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-white">
            Already have an account?{" "}
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
