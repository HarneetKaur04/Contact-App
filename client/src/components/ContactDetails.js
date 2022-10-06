import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';

const ContactDetails = ({userDetails, deleteUserDataPassToParent}) => {
    const navigate = useNavigate();

    const handleDeleteContact = async (deleteUserData)=> {
        console.log("deleteUserData = ", deleteUserData)
        deleteUserDataPassToParent(deleteUserData)
      }

    const handleFavoriteContact = async (saveUserFavorite)=> { 
        console.log("saveUserFavorite = ", saveUserFavorite)
        const id = saveUserFavorite.contact_id
        return await fetch(`http://localhost:5000/api/favorites/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(saveUserFavorite),
        })
        .then((response) => {return response.json();
        })
        .then((data) => {
            console.log("From the post request", data);
            navigate('/favorites')
        })
        
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
        <button class="ui pink button" onClick={()=>handleFavoriteContact(userDetails)}>{userDetails.favorite == true? "Unlike" : "Like"}
            <i class="heart large icon"></i>
        </button>
    </div>
  </>
  )
}

export default ContactDetails