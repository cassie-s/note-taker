import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db', 'db.json');

export default function handler(req, res) {
  if (req.method === 'GET') {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json(JSON.parse(data || '[]'));
    });
  }

  if (req.method === 'POST') {
    const newNote = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
      const notes = data ? JSON.parse(data) : [];
      const newId = notes.length + 1;
      notes.push({ id: newId, ...newNote });

      fs.writeFile(filePath, JSON.stringify(notes), err => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json(notes);
      });
    });
  }
}
