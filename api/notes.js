const mongoose = require('mongoose');
const Note = require('../models/Note');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = async (req, res) => {
  await connectDB();

  if (req.method === 'GET') {
    const notes = await Note.find();
    const mappedNotes = notes.map(note => ({
      id: note._id,
      title: note.title,
      text: note.text
    }));
    return res.status(200).json(mappedNotes);
  }

  if (req.method === 'POST') {
    const { title, text } = req.body;
    const newNote = new Note({ title, text });
    await newNote.save();
    return res.status(201).json({
      id: newNote._id,
      title: newNote.title,
      text: newNote.text
    });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};