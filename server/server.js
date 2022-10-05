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
    const { rows: contacts } = await db.query('SELECT * FROM contacts');
    res.send(contacts);
  } catch (e) {
    console.log(e)
    return res.status(400).json({ e });
  }
});


// create the POST request
app.post('/api/contacts', cors(), async (req, res) => {
  const newUser = {name: req.body.name, email: req.body.email, phone: req.body.phone, notes: req.body.notes, image: req.body.image}
  console.log("Checking newUser at backend" ,[newUser.name, newUser.email, newUser.phone, newUser.notes, newUser.image]);

  const result = await db.query(
    'INSERT INTO contacts(name, email, phone, notes, image) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [newUser.name, newUser.email, newUser.phone, newUser.notes, newUser.image],
  );
  console.log("Checking newUser posted at database", result.rows[0]);
  res.json(result.rows[0]);
});


// delete request
// app.delete('/api/users/:deleteEmail', cors(), async (req, res) => {
//   const deleteEmail = req.params.deleteEmail;

//   console.log("Delete City Name " ,deleteEmail);
//   try {
//     await db.query("DELETE FROM users WHERE email=$1", [deleteEmail]);
//     res.send({ status: "success" });
//     } catch (e) {
//       console.log(e)
//     return res.status(400).json({ e });
//     }
//     })

// console.log that your server is up and running
app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
