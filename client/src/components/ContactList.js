import React, {useState, useEffect} from 'react'
import ContactDetails from './ContactDetails'
import { Link } from "react-router-dom";

const ContactList = ({contactsList}) => {
console.log("contactsList prop details = " , contactsList)
const [userDetailsStart, setUserDetailsStart] = useState(false)
const [userDetails, setUserDetails] = useState([])


const handleDetailsButton = (contactInfo) => {
    console.log("contactInfo". contactInfo)
    setUserDetails(contactInfo)
    setUserDetailsStart(true)
}
console.log("check which contact selected for details", userDetails)

const deleteUserDataPassToParent = async (deleteUserData) => {
    const deleteId = deleteUserData.contact_id
      console.log("check deleteId", deleteId)
      await fetch(`http://localhost:5000/api/contacts/${deleteId}`, {method: "DELETE"})
      .then((response) => response.json())
      .then((data) => {
          console.log("Delete Request Complete frontend", data);
    })
    contactsList.filter(user => user.contact_id != deleteId)
    setUserDetailsStart(false)
    window.location.reload()
}
    

  return (
    <div>
{userDetailsStart? 
            (<>
            <ContactDetails userDetails={userDetails} deleteUserDataPassToParent={deleteUserDataPassToParent}/>
            </>
) : null }
        <div role="list" className="ui animated middle aligned list"> 
        {contactsList.map((contact) => (   
            <div key ={contact.contact_id} role="listitem" className="item">
                <img src={contact.image} className="ui avatar image" alt={contact.name}/>
                <div className="content">
                    <div className="header">{contact.name}</div>
                </div>
                <button className='viewbtn' onClick={()=> handleDetailsButton(contact)}>Details</button>
                
            </div>                                
        )
        )}
        </div>
        
        
        
    </div>
  )
}

export default ContactList