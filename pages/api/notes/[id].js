import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'db', 'db.json');

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const noteId = parseInt(req.query.id);

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) return res.status(500).json({ error: err.message });

      const notes = JSON.parse(data).filter(note => note.id !== noteId);

      fs.writeFile(filePath, JSON.stringify(notes), err => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(notes);
      });
    });
  }
}
