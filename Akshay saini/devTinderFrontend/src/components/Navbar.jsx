import axios from 'axios';
import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom';
import { baseUrl } from '../utils/Constant';
import { removeUser } from '../utils/userSlice';


function Navbar() {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const handleLogout = async()=>{
      try{
        await axios.post(baseUrl + "/logout", {},{withCredentials:true});
        dispatch(removeUser());
        return navigate("/login");
      }catch(error){
        console.error("ERROR: " + error)
      }
    }

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
  <div className="flex-1">
    <Link to="/" className="btn btn-ghost text-xl">devTinder</Link>
  </div>
 {user &&  <div className="flex gap-6">

<input type="text" placeholder="Search" className="input input-bordered w-24 md:w-auto" />

 <div className="dropdown dropdown-end flex items-center gap-2 ">
  <p>welcome, {user.firstName}</p>
  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
    <div className="w-10 rounded-full">
      <img
        alt="user photo"
        src={user.photoUrl} />
    </div>
  </div>

  <ul
    tabIndex={0}
    className="menu menu-sm dropdown-content bg-base-300 rounded-box z-1 mt-14 w-52 p-2 shadow ">
    <li>
      <Link to="/profile" className="justify-between">
        Profile
        <span className="badge">New</span>
      </Link>
    </li>
    <li>
      <Link to="/signup" className="justify-between">
        Signup
      </Link>
    </li>
    <li >
      <Link to="/connection">Connection</Link>
    </li>
    <li >
      <Link to="/requests">Request</Link>
    </li>
    <li><a onClick={handleLogout}>Logout</a></li>
  </ul>
</div>

</div>}
</div>
  )
}

export default Navbar
