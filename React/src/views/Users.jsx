import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users() {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
  }, [])

  const onDelete = u => {

    if (!window.confirm('Are Sure Want to Delete User?')) {
      return
    }

    axiosClient.delete(`/users/${u.id}`)
    .then(() => {
      getUser();
    })
  }

  const getUser = () => {
    setLoading(true);
    axiosClient.get('/users')
    .then(({data}) => {
    setLoading(false);
      console.log(data.data);
      setUsers(data.data)
    })
    .catch(() => {
      setLoading(false);
    })
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
        <h1>Users</h1>
        <Link to='/user/new' className="btn-add" >Add New</Link>
      </div>
        <div className="card animated fadeInDown">
          <table>
            <thead>
              <tr>                
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Created Date</th>
                <th>Action</th>
              </tr>
            </thead>
            {loading &&
            <tbody>
              <tr>
                <td colSpan='5' className="text-center" >Loading...</td>
              </tr>
            </tbody>
            }
            {!loading &&
            <tbody>
              { users.map(u => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={'/user/'+u.id} >Edit</Link>
                    &nbsp;
                    <button onClick={e => onDelete(u)} className="btn-delete" >Delete</button>
                  </td>
                </tr> 
              )) }
            </tbody>
            }
          </table>
        </div>
    </div>
  )
}