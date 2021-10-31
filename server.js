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

app.get('/api/notes', (req, res) => {
  res.send('Hello!');
});

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

