const express = require('express');
const { notes } = require('./db/db');

const PORT = process.env.PORT || 3003;
const app = express();


app.get('/api/db', (req, res) => {
  res.send('Hello!');
})

app.listen(PORT, () => {
    console.log(`API server now live at http://localhost:${PORT} !`);
  });