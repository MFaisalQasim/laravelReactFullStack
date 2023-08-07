import { useRef } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function Signup() {
  
  const nameRef = useRef()
  const eamilRef = useRef()
  const passwordRef = useRef()
  const confirmPasswordRef = useRef()

  const {setUser, setToken} = useStateContext()

  const onSubmit = (e) =>{
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      email: eamilRef.current.value,
      password: passwordRef.current.value,
      confirmPassword: confirmPasswordRef.current.value,
    }

    axiosClient.post('/signup',payload)
    .then(({data}) => {
      setUser(data.user)
      setToken(data.token)
    })
    .catch(err => {
      const response = err.response;
      if (response && response.status === 422) {
        console.log(response.data.errors);
      }
    })
  }

  return (
    <div className="login-signup-form animated fadeInDown">
      <div className="form">
        <form onSubmit={onSubmit}>
          <h1 className="title">Signup For Free</h1>
          <input ref={nameRef} type="text" placeholder="Full Name" />
          <input ref={eamilRef} type="email" placeholder="Email" />
          <input ref={passwordRef} type="password" placeholder="Password" />
          <input ref={confirmPasswordRef} type="password" placeholder="Confirm Password" />
          <button className="btn btn-block">Sign up</button>
          <p className="message">
            Already Register? <Link to="/login " >Create An Account</Link>
          </p>
        </form>
      </div>
    </div>
  )
}
