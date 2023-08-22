// import { useEffect,useState } from "react";
// import {useNavigate, useParams } from "react-router-dom";
// import axiosClient from "../axios-client";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import PageComponent from "../components/PageComponent";
import SurveyListItem from "../components/SurveyListItem";
import TButton from "../components/core/TButton";
import { useStateContext } from "../contexts/ContextProvider";

export default function Survey() {
  
  // const nameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const password_confirmationRef = useRef();

  const {survey} = useStateContext();

  // const [survey, setSurvey] = useState([]);
  // console.log(survey);

  // const {setNotification} = useStateContext();
  // const {id} = useParams();
  // const navigate = useNavigate();
  // const [loading, setLoading] = useState(false);
  // const [errors, setErrors] = useState(null);
  // const [user, setUser] = useState({
  //   id: null,
  //   name: '',
  //   email: '',
  //   password: '',
  //   password_confirmation: '',
  // });  

  // if (id) {
  //   useEffect(() => {
  //     getUser();
  //   }, [])
  // }
  
  // const getUser = () => {
  //   setLoading(true);
  //   axiosClient.get(`/users/${id}`)
  //   .then(({data}) => {
  //   setLoading(false);
  //     // console.log(data);
  //     setUser(data)
  //   })
  //   .catch(() => {
  //     setLoading(false);
  //   })
  // }

  // const onSubmit = e => {
  //   e.preventDefault();
  //   if (user.id) {
  //     // debugger;
  //     axiosClient.put(`/users/${user.id}`, user)
  //       .then(() => {
  //         setNotification("User Updated Sucessfully")
  //         navigate('/users')
  //       })
  //       .catch(err => {
  //         const response = err.response;
  //         if (response && response.status === 422) {
  //           setErrors(response.data.errors)
  //         }
  //       })
  //   } else{
  //     axiosClient.post(`/users`, user)
  //       .then(() => {
  //         setNotification("User Created Sucessfully")
  //         navigate('/users')
  //       })
  //       .catch(err => {
  //         const response = err.response;
  //         if (response && response.status === 422) {
  //           setErrors(response.data.errors)
  //         }
  //       })
  //   }
  // }
const onDeleteClick = () => {

  console.log('Are Sure Want to Delete User?');

  // if (!window.confirm('Are Sure Want to Delete User?')) {
  //   return
  // }

  // axiosClient.delete(`/users/${u.id}`)
  // .then(() => {
    
  //   setNotification("User Deleted Sucessfully");
  //   getUser();
  // })
}

  return (
    <>
    <PageComponent title="Survey" button={ (
      <TButton color="green" to="/surveys/create" >
        <PlusCircleIcon className="h-6 w-6 mr-2" />
        Create
      </TButton>
    ) } >      
      <h1>Survey Childerns</h1>
      <div className="grid grid-cols-1 gap-5 sm:grid-col-2 md:grid-cols-3">
        {survey.map((survey)=>(
          <SurveyListItem survey={survey} key={survey.id}
          onDeleteClick={onDeleteClick} 
          />
        ))}
      </div>
    </PageComponent>
    </>
    // <>
    // {user.id && <h1>Update User: {user.name}</h1> }
    // {!user.id && <h1>New User</h1> }
    //   <div className="form justify-content-center">
    //     <div className="card animated fadeInDown">
    //       {loading && (
    //         <div className="text-center">Loading...</div>
    //       )}
    //       {errors && <div className="alert">
    //         {Object.keys(errors).map(key => (
    //           <p key={key}>{errors[key][0]}</p>
    //         ))}
    //       </div> 
    //       }
    //       {!loading && 
    //         <form onSubmit={onSubmit}>
    //           <br />
    //           <input value={user.name} onChange={e =>setUser({...user, name: e.target.value})} placeholder="Full Name" />
    //           <input value={user.email} onChange={e =>setUser({...user, email: e.target.value})} placeholder="Email" />
    //           <input onChange={e =>setUser({...user, password: e.target.value})} type="password" placeholder="Password" />
    //           <input onChange={e =>setUser({...user, password_confirmation: e.target.value})} type="password" placeholder="Confirm Password" />
    //           <button className="btn">save</button>
    //         </form>
    //       }
    //     </div>
    //   </div>
    // </>
  )
}
