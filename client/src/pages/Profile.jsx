import React from 'react'
import { isAuthenticated } from '../auth'

const Profile = () => {
    const{user}=isAuthenticated()
  return (
    <>
        <h2>Welcome,{user.name} </h2>
    </>
  )
}

export default Profile