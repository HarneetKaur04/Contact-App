import React, {useState, useEffect} from 'react'

const ContactList = ({contactsList}) => {
console.log("contactsList prop details = " , contactsList)


    

  return (
    <div>

        <div role="list" className="ui animated middle aligned list"> 
        {contactsList.map((contact) => (   
            <div key ={contact.contact_id} role="listitem" className="item">
                <img src={contact.image} className="ui avatar image" alt={contact.name}/>
                <div className="content">
                    <div className="header">{contact.name}</div>
                </div>
                <button className='viewbtn'>Details</button>
            </div>                       
        )
        )}
        </div>
        
    </div>
  )
}

export default ContactList