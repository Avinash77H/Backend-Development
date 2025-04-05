import axios from 'axios';
import React from 'react'
import { baseUrl } from '../utils/Constant';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';

function UserCard({user}) {
  const {_id,firstName,lastName,age,gender,photoUrl,about,skills} = user;
  const dispatch = useDispatch();

  const handleSendRequest = async(status,_id)=>{
    try{
       await axios.post(baseUrl + "/request/send/" + status + "/" + _id,{},{withCredentials:true});
      dispatch(removeUserFromFeed(_id));
    }catch(error){
      console.error("ERROR: ",error);
    }
  }

  return (
    <div className='flex justify-center'>
      <div className="card bg-base-300 w-96 shadow-sm">
    <figure className="px-10 pt-10">
      <img
        src={photoUrl}
        alt="photo"
        className="rounded-xl"/>
    </figure>
    <div className="card-body items-center text-center">
      <h2 className="card-title">{firstName + " " + lastName}</h2>
      {age && gender && <p>{age + " , " + gender}</p>}
      <p>{about}</p>
      {skills && <div>{skills.map((skill)=>{
        return <span className='text-blue-400'>#{skill} </span>
      })}</div>}
      
      <div className="card-actions">
        <button className="btn btn-primary" onClick={()=>handleSendRequest("ignored",_id)}>ignore</button>
        <button className="btn btn-secondary" onClick={()=>handleSendRequest("interested",_id)}>interested</button>
      </div>
    </div>
  </div>
    </div>
  )
}

export default UserCard
