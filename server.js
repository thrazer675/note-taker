const express = require('express');
const path = require('path');
let notes = require("./db/db.json");
const fs = require('fs');
const uuid = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));

app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// // Displays all characters
app.get('/api/notes', (req, res) => res.json(notes));

app.post("/api/notes", function (req, res) {
  try {
    notes = fs.readFileSync("db/db.json", "utf8");
    console.log(notes);
    notes = JSON.parse(notes);
    req.body.id = uuid.v4();
    notes.push(req.body);
    notes = JSON.stringify(notes);

    fs.writeFile("./db/db.json", notes, "utf8", function (err) {
      if (err) throw err;
      notes = JSON.parse(notes);
      res.json(notes);
    });
    
  } catch (err) {
    console.error(err);
    throw err;
  }
});

// Starts the server 

app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));