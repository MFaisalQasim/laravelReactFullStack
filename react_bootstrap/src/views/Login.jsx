import { Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useRef, useState } from "react";
import axiosClient from "../axios-client";

export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [errors, setErrors] = useState(null);
  const {setUser, setToken} = useStateContext();
  const onSubmit = (e) =>{
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    setErrors(null);
    axiosClient.post('/login', payload)
    .then(({data}) => {
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        if (response.data.errors) { 
          setErrors(response.data.errors)       
        }
        setErrors(
          {email: [response.data.message]}
        )
      }
    })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Login Into Your Account</h1>
     <h1 className="text-3xl font-bold underline">
    Hello world!
  </h1>
          {errors && <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div> 
          }
          <input ref={emailRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <button className="btn btn-block">Login</button>
          <p className="message">
            Not Register <Link to="/signup" >Create An Account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
