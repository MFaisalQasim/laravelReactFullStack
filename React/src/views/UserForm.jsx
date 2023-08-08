import { useEffect, useRef,useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

export default function UserForm() {
  
  // const nameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const confirmPasswordRef = useRef();
  // const {setUser, setToken} = useStateContext();

  const {id} = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);
  const [user, setUser] = useState({
    id: null,
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  useEffect(() => {
    getUser();
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
  //   axiosClient.get(`/users/${u.id}`)
  //   .then(() => {
  //     getUser();
  //   })
  }

  const getUser = () => {
    setLoading(true);
    axiosClient.get('/users')
    .then(({data}) => {
    setLoading(false);
      console.log(data.data);
      setUser(data.data)
    })
    .catch(() => {
      setLoading(false);
    })
  }

  return (
    <>
    {user.id && <h1>Update User: {user.name}</h1> }
    {!user.id && <h1>New User</h1> }
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">Loading...</div>
        )}
        {errors && <div className="alert">
          {Object.keys(errors).map(key => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div> 
        }
        {!loading && 
        // <div className="form">
          <form onSubmit={onSubmit}>
            <h1 className="title">Add New User</h1>
            <br />
            <input value={user.name} onChange={e =>setUser({...user, name: e.target.value})} type="text" placeholder="Full Name" />
            <input value={user.email} onChange={e =>setUser({...user, email: e.target.value})} type="email" placeholder="Email" />
            <input onChange={e =>setUser({...user, password: e.target.value})} type="password" placeholder="Password" />
            <input onChange={e =>setUser({...user, confirmPassword: e.target.value})} type="password" placeholder="Confirm Password" />
            <button className="btn btn-block">save</button>
            {/* <p className="message">
              Already Register? <Link to="/login" >Login An Account</Link>
            </p> */}
          </form>
        // </div>
        }
      </div>
    </>
  )
}
