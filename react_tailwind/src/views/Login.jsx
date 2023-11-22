import { useStateContext } from "../contexts/ContextProvider";
import {useState } from "react";
import axiosClient from "../axios-client";

export default function Login() {

  const {setUser, setToken} = useStateContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({__html: ""});

  const onSubmit = e =>{
    e.preventDefault();
    setError({__html:""});

    const payload = {
      email: email,
      password: password,
    }

    axiosClient.post('/login'
    , payload
    )
    .then(({data}) => {
      setUser(data.user)
      setToken(data.token)
    })
    .catch(error => {
      const response = error.response.data.errors;
      if (response && error.response.status === 422) {
      const finalError = Object.values(error.response.data.errors).reduce((accum, next) => [...accum, ...next],[])
      setError({__html: finalError.join('<br>')})
      }
      else{
        setError({__html: error.response.data.message})
        console.error(error.response.data);
        console.error(error.response.data.message);
      }
    })
  }
  return (
    <>
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Login in to your account
      </h2>
      <p className="mt-10 text-center text-sm text-gray-500">
        Not a member?{' '}
        <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          Sign In
        </a>
      </p>
      <form className="space-y-6" action="#" method="POST" onSubmit={onSubmit}>
      {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error} ></div>)}
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
            <div className="text-sm">
              <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
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
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>
    </>
  )
}