import axios from 'axios'
import React, { useEffect } from 'react'
import { baseUrl } from '../utils/Constant'
import { useDispatch, useSelector } from 'react-redux'
import { addFeed } from '../utils/feedSlice'
import UserCard from './UserCard'

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector(store => store.feed);
  
  const getFeed = async()=>{
    try{
      if (feed) return; 
      const res = await axios.get(baseUrl + "/user/feed?page=1&limit=10",{withCredentials:true});
      dispatch(addFeed(res?.data?.data));
    }catch(error){
      console.error("error:",error);
    }
  }

  useEffect(()=>{
    getFeed();
  },[]);

  if(!feed) return;

  if(feed.length === 0){
    return <h1 className='text-center'>New User not Found!</h1>
  }
  return (
    <div>
      {feed && <UserCard user={feed[0]}/>}
    </div>
  )
}

export default Feed
