import React, {useState, useEffect} from 'react'

const LikedContact = () => {
  const [favPeople, setFavPeople] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/favorites")
      .then((response) => response.json())
      .then((data) => {
        console.log("favorite data" , data)
        setFavPeople(data);
          });
  }, []);

  const handleUnsaveContact = async (unsaveContact) => {
    console.log(unsaveContact)
    const idOfUnsave = unsaveContact.contact_id;
    return await fetch(`http://localhost:5000/api/favorites/${idOfUnsave}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(unsaveContact),
    })
    .then((response) => {return response.json();
    })
    .then((data) => {
        console.log("From the post request", data);
        setFavPeople(favPeople.filter(item=> item.contact_id != idOfUnsave))
    })
    }

  return (
    <div>
      <h2>My Favorites Contacts </h2>
      {favPeople.map((item) => (<div className="card-fav">
          Name: {item.name} <br/>
          Email:  {item.email} <br/>
          Phone: {item.phone} <br/>
          Notes: {item.notes} <br/>
          <button onClick={() => handleUnsaveContact(item)}>{item.favorite == true? "Unsave" : "Save"}</button>
         </div>
        ))}
    </div>
   
  )
}

export default LikedContact