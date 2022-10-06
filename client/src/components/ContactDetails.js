import React from 'react'
import {useNavigate} from "react-router-dom"

const ContactDetails = ({userDetails, deleteUserDataPassedToParent}) => {
    const navigate = useNavigate();
    console.log("contactInfo" , userDetails)


    const handleDeleteContact = (deleteUserData)=> {
        console.log("deleteUserData = ", deleteUserData)
        deleteUserDataPassedToParent(deleteUserData)
        window.location.reload()
    }
  return (
  <>
    <div className="card">
        <img src={userDetails.image} className="img-card"/>
        <div className="container">
            <h4><b>{userDetails.name}</b></h4> 
            <p>Phone: {userDetails.phone}</p>
            <p>Email: {userDetails.email}</p>  
            <p>Notes: {userDetails.notes}</p>
        </div>
        <button class="ui red button" onClick={()=>handleDeleteContact(userDetails)}>
            <i class="delete large icon"></i>
        </button>
        <button class="ui yellow button" >
            <i class="edit large icon"></i>
        </button>
    </div>
  </>
  )
}

export default ContactDetails