const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./db/db-connection.js');
// const allRouter = require("./routes/routes");

const app = express();
// set port, listen for requests

const PORT = 5000;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route /api
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Harneet' });
});

// getting all routes
// app.use("/", allRouter);

// creates an endpoint for contact table

app.get('/api/contacts', cors(), async (req, res) => {
  try {
    const { rows: contacts } = await db.query('SELECT * FROM contacts ORDER BY contact_id');
    res.send(contacts);
  } catch (e) {
    console.log(e)
    return res.status(400).json({ e });
  }
});


// create the POST request
app.post('/api/contacts', cors(), async (req, res) => {
  const newUser = {name: req.body.name, email: req.body.email, phone: req.body.phone, notes: req.body.notes, image: req.body.image, favorite: req.body.favorite}
  console.log("Checking newUser at backend" ,[newUser.name, newUser.email, newUser.phone, newUser.notes, newUser.image, newUser.favorite]);

  const result = await db.query(
    'INSERT INTO contacts(name, email, phone, notes, image, favorite) VALUES($1, $2, $3, $4, $5, $6) RETURNING *',
    [newUser.name, newUser.email, newUser.phone, newUser.notes, newUser.image, newUser.favorite],
  );
  console.log("Checking newUser posted at database", result.rows[0]);
  res.json(result.rows[0]);
});

// get request for delete ID
app.get('/api/contacts/:deleteId', cors(), async (req, res) => {
  const deleteId= req.params.deleteId;
  try {
    const { rows: contacts } = await db.query('SELECT * FROM contacts where contact_id=$1', [deleteId]);
    res.send(contacts);
  } catch (e) {
    console.log(e)
    return res.status(400).json({ e });
  }
    })

// delete request
app.delete('/api/contacts/:deleteId', cors(), async (req, res) => {
  const deleteId= req.params.deleteId;

  console.log("Delete Contact Details" ,deleteId);
  try {
    await db.query('DELETE FROM contacts WHERE contact_id=$1', [deleteId]);
    res.send({ status: "success" });
    } catch (e) {
      console.log(e)
    return res.status(400).json({ e });
    }
    })


    app.get('/api/favorites', cors(), async (req, res) => {
      try {
        const { rows: contacts } = await db.query('SELECT * FROM contacts where favorite = true');
        res.send(contacts);
      } catch (e) {
        console.log(e)
        return res.status(400).json({ e });
      }
    });
    
    app.get('/api/favorites/:id', cors(), async (req, res) => {
      const favUserId = req.params.id
      console.log("Checking favUserId at backend" , favUserId);
    
      const { rows: contacts } = await db.query(
        'SELECT * FROM contacts where contact_id = $1',[favUserId]
      );
      res.send(contacts);
    });
    
    // create the POST request
    app.post('/api/favorites/:id', cors(), async (req, res) => {
      const favUserId = req.params.id
      console.log("Checking favUserId at backend:" , favUserId);
    
      const result = await db.query(
        `UPDATE contacts SET favorite = NOT favorite WHERE contact_id= $1`, [favUserId]
      );
      console.log("Checking favUserId posted at database", result);
      res.status(200).json(result.rows)
    });

    // Post request for not favorite
    // app.post('/api/favorites/:id', cors(), async (req, res) => {
    //   const notFavUserId = req.params.id
    //   console.log("Checking favUserId at backend:" , notFavUserId);
    
    //   const result = await db.query(
    //     `UPDATE contacts SET favorite = 'false' WHERE contact_id= $1`, [notFavUserId]
    //   );
    //   console.log("Checking favUserId posted at database", result);
    //   res.json(result.rows[0]);
    // });

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
