import React, {useState, useEffect} from 'react'
import ContactDetails from './ContactDetails'
import { Link } from "react-router-dom";

const ContactList = ({contactsList, deleteUserDataPassedToParent}) => {
console.log("contactsList prop details = " , contactsList)

const [userDetails, setUserDetails] = useState()


const handleDetailsButton = (contactInfo) => {
    setUserDetails(contactInfo)
    console.log("check which contact selected for details",userDetails )
}


    

  return (
    <div>
{userDetails? 
            (<>
            <ContactDetails userDetails={userDetails} deleteUserDataPassedToParent={deleteUserDataPassedToParent}/>
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