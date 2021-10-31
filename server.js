// required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// port declaration
const PORT = process.env.PORT || 3003;

// initiate the server
const app = express();

app.use(express.urlencoded ( { extended: true}));
app.use(express.json());
app.use(express.static('public'));

// request database
const { notes } = require ('./db/db.json');

// function that takes the data from req.body and adds it to db.json file
function createNewNote (body, notesArray) {
  const note = body;
  notesArray.push(note);

  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes : notesArray }, null, 2)
  );
  return note;
};

// validation
function validateNote (note) {
  if(!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  }
  return true;
};

app.get('/api/notes', (req, res) => {
  res.json(notes);
});

// post route
app.post('/api/notes', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = notes.length.toString();

  // if any data in req.body is incorrect, send error
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');

  } else {
    // add content to json file and notes array
    const note = createNewNote(req.body, notes);

    res.json(note);
  }
})

// route to index.html 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/index.html'));
}); 

// route to notes.html 
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname,'./public/notes.html'));
}); 

app.listen(PORT, () => {
    console.log(`API server now live at http://localhost:${PORT}!`);
});

