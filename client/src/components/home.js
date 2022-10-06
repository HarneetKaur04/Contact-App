import React, {useState, useEffect} from 'react'
import AddContact from './AddContact';
import ContactList from './ContactList';
import Header from "./header";

const Home = () => {

  const [contactsList, setContactsList] = useState([])
 


  const newContactData = async (addUserFields) =>{
    console.log("contactDataFromForm" , addUserFields)
    return await fetch("http://localhost:5000/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addUserFields),
        })
        .then((response) => {return response.json();
        })
        .then((data) => {
            console.log("From the post request", data);
            setContactsList([...contactsList, data])
        })
      }

  const deleteUserDataPassedToParent = async (deleteUserInformationBackFromGrandChild) => {
      console.log("deleteUserInformationBackFromGrandChild", deleteUserInformationBackFromGrandChild)
      const deleteId = deleteUserInformationBackFromGrandChild.contact_id
      console.log("check deleteId", deleteId)
      await fetch(`http://localhost:5000/api/contacts/${deleteId}`, {method: "DELETE"})
      .then((response) => response.json())
      .then((data) => {
          console.log("Delete Request Complete frontend", data);
          setContactsList(contactsList.filter((contacts) => contacts.contact_id != deleteId));
      })
    }

      useEffect(() => {
        const getContactListToDisplay = async () => {
          fetch("http://localhost:5000/api/contacts")
            .then((response) => response.json())
            .then((data) => {
              setContactsList(data);
              console.log("contactsList", contactsList)
                });
              }
              getContactListToDisplay()
        }, []);
        console.log("contactsList =", contactsList)   

  return (
    <div>
      <Header />
      <AddContact newContactData = {newContactData}/> 
      <ContactList contactsList={contactsList} deleteUserDataPassedToParent={deleteUserDataPassedToParent} /> 
    </div>

  )
}

export default Home;