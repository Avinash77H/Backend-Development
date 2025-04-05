import React, { useEffect } from 'react'
import {Outlet} from 'react-router-dom';
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { baseUrl } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Body() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const fetchProfile = async()=>{
    try{
      const res = await axios.get(baseUrl + "/profile",{withCredentials:true});
      dispatch(addUser(res.data.data));
    }catch(error){
      if(error.status === 401){
        navigate('/login');
      }
      console.error("ERROR: " + error);
    }
  }

  useEffect(()=>{
    fetchProfile();
  },[])

  return (
    <div>
      <Navbar/>
      <div className='mt-2 min-h-80'>
      <Outlet/>
      </div>
      <Footer />
    </div>
  )
}

export default Body
