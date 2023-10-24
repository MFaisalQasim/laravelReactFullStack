import {useState } from "react";
// import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {

  const {setUser, setToken} = useStateContext();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errors, setErrors] = useState({__html: ""});

  const onSubmit = e =>{

    e.preventDefault();
    setErrors({__html:""});

    const payload = {
      name: fullName,
      email: email,
      password: password,
      password_confirmation: passwordConfirmation,
    }

    axiosClient.post('/signup'
    , payload
    )
    .then(({data}) => {
      console.log(data);
      setUser(data.user)
      setToken(data.token)
    })
    .catch(error => {
      const response = error.response;
      if (response && response.status === 422) {
      const finalErrors = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next],[])
      setErrors({__html: finalErrors.join('<br>')})
      }
      console.error(error);
    })
  }

  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign up to your account
      </h2>
          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <a href="login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Login
            </a>
          </p>
          {errors.__html && (<div className="bg-500-red rounded py-2 px-3 text-blue" dangerouslySetInnerHTML={errors} ></div>)}
      <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium leading-6 text-gray-900">
          Full Name
          </label>
          <div className="mt-2">
            <input
              id="fullName"
              name="fullName"
              type="text"
              value={fullName}
              onChange={e => setFullName(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Email address
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="passwordConfirmation" className="block text-sm font-medium leading-6 text-gray-900">
              Confirm Password
            </label>
          </div>
          <div className="mt-2">
            <input
              id="passwordConfirmation"
              name="passwordConfirmation"
              type="password"
              autoComplete="current-password"
              value={passwordConfirmation}
              onChange={e => setPasswordConfirmation(e.target.value)}
              required
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>
        
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Login
          </button>
        </div>
      </form>
    </>
  )
}
