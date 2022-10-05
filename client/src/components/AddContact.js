import React, { useState} from 'react'
import {useNavigate} from "react-router-dom"

const AddContact = (props) => {
    const navigate = useNavigate();
    const [addContactForm, setAddContactForm] = useState(false)
    const [addUserFields, setAddUserFields] = useState({name:"", email:"", phone: "", notes:"", image:""})

    const handleAddUser = () => {
        setAddContactForm(true)
    }

    const handleFormInputToAddContact = (e) => {
        setAddUserFields((preValues) => ({
            ...preValues,
            [e.target.name]: e.target.value
          }));
    }

    const handleFormSubmitAddContact = async (e) => {
        e.preventDefault();
        console.log("values of new contact added" ,addUserFields)    
        props.newContactData(addUserFields);
        // setAddUserFields({name:"", email:"", phone: "", notes:"", image:""})
        setAddContactForm(false)
        navigate('/');
    }
   
  return (
    <div>
        <i className="fa-solid fa-user-plus fa-lg" onClick={handleAddUser}>Add User</i>
        {addContactForm ? 
        (
            <form onSubmit={handleFormSubmitAddContact}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" placeholder="John Doe" onChange={handleFormInputToAddContact} required/>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="abc@gmail.com" onChange={handleFormInputToAddContact}required/>

                <label htmlFor="phone">Phone Number</label>
                <input type="text" name="phone" placeholder="" onChange={handleFormInputToAddContact} required/>

                <label htmlFor="notes">Notes</label>
                <input type="text" name="notes" placeholder="" onChange={handleFormInputToAddContact}/>

                <label htmlFor="image">Image URL</label>
                <input type="text" name="image" placeholder="" onChange={handleFormInputToAddContact}/>
            
                <input type="submit" value="Submit"/>
            </form>
     
        ): null}
    </div>
  )
}

export default AddContact;