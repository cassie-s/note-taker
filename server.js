// required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// port declaration
const PORT = process.env.PORT || 3003;

// initiate the server
const app = express();


// data parsing
app.use(express.urlencoded ( { extended: true}));
app.use(express.json());
app.use(express.static('public'));

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
}); 

app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/notes.html'));
}); 


// Displays all notes
app.get("/api/notes", function (req, res) {
  fs.readFile("db/db.json", "utf8", function (err, notes) {
      if (err) {
          console.log(err)
          return
      }
      res.json(JSON.parse(notes));
  })
});


//Posting note to db.json
app.post("/api/notes", function (req, res) {
  const newNote = req.body
  let notesDB = []
  fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
      if (err) {
          return console.log(err);
      }
      if (data === "") { // if starting from an empty json file
          notesDB.push({ "id": 1, "title": newNote.title, "text": newNote.text });
      } else {
          notesDB = JSON.parse(data);
          notesDB.push({ "id": notesDB.length + 1, "title": newNote.title, "text": newNote.text });
      }
      // updated notes pushed to db.json
      fs.writeFile((path.join(__dirname + "/db/db.json")), JSON.stringify(notesDB), function (error) {
          if (error) { return console.log(error); }
          res.json(notesDB);
      });
  });
});

// delete notes
app.delete("/api/notes/:id", function (req, res) {
  const newNote = req.body
  const noteID = req.params.id
  let notesDB = []
  fs.readFile(path.join(__dirname + "/db/db.json"), "utf8", function (err, data) {
      if (err) {
          return console.log(err);
      }
      notesDB = JSON.parse(data);
      notesDB = notesDB.filter(function(object){
          return object.id != noteID
      })

      // updated notes pushed to db.json
      fs.writeFile((path.join(__dirname + "/db/db.json")), JSON.stringify(notesDB), function (error) {
          if (error) { return console.log(error); }
          res.json(notesDB);
      });
  });
});


// Starts the server
// ==================================================================
app.listen(PORT, () => {
    console.log(`API server now live at http://localhost:${PORT}!`);
});

