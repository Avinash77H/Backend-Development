import React from 'react'
import EditProfile from '../components/EditProfile'
import { useSelector } from 'react-redux'
import UserCard from '../components/UserCard';

function Profile() {
  const user = useSelector(state => state.user);
  return (
   user &&  <div>
      <EditProfile user={user}/>
    </div>
  )
}

export default Profile
