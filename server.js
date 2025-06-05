require('dotenv').config();
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas!'))
.catch((err) => console.error('MongoDB connection error:', err));

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


const Note = require('./models/Note');

// Get all notes
app.get('/api/notes', async (req, res) => {
  try {
    const notes = await Note.find();
    // Map _id to id for frontend compatibility
    const mappedNotes = notes.map(note => ({
      id: note._id,
      title: note.title,
      text: note.text
    }));
    res.json(mappedNotes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save a new note
app.post('/api/notes', async (req, res) => {
  try {
    const { title, text } = req.body;
    const newNote = new Note({ title, text });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a note by ID
app.delete('/api/notes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Note.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Starts the server
// ==================================================================
app.listen(PORT, () => {
    console.log(`API server now live at http://localhost:${PORT}!`);
});

