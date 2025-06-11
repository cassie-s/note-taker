const mongoose = require('mongoose');
const Note = require('../../models/Note');

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = async (req, res) => {
  await connectDB();

  const { id } = req.query;

  if (req.method === 'DELETE') {
    await Note.findByIdAndDelete(id);
    return res.status(204).end();
  }

  if (req.method === 'PUT') {
    const { title, text } = req.body;
    await Note.findByIdAndUpdate(id, { title, text });
    return res.status(200).json({ id, title, text });
  }

  res.setHeader('Allow', ['DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
};