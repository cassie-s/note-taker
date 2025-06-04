import { useEffect, useState } from 'react';

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await fetch('/api/notes');
    const data = await res.json();
    setNotes(data);
  };

  const handleSave = async () => {
    if (!title.trim() || !text.trim()) return;
    await fetch('/api/notes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, text }),
    });
    setTitle('');
    setText('');
    setActiveNote(null);
    fetchNotes();
  };

  const handleDelete = async (id) => {
    await fetch(`/api/notes/${id}`, { method: 'DELETE' });
    setActiveNote(null);
    fetchNotes();
  };

  const handleViewNote = (note) => {
    setActiveNote(note);
    setTitle(note.title);
    setText(note.text);
  };

  const handleNewNote = () => {
    setActiveNote(null);
    setTitle('');
    setText('');
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark">
        <a className="navbar-brand" href="/">Note Taker</a>
      </nav>
      <div className="container mt-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-4">
            <ul className="list-group list-container">
              {notes.length === 0 ? (
                <li className="list-group-item">No saved Notes</li>
              ) : (
                notes.map((note) => (
                  <li
                    key={note.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <span
                      className="list-item-title"
                      onClick={() => handleViewNote(note)}
                      style={{ cursor: 'pointer' }}
                    >
                      {note.title}
                    </span>
                    <i
                      className="fas fa-trash-alt text-danger"
                      style={{ cursor: 'pointer' }}
                      onClick={() => handleDelete(note.id)}
                    />
                  </li>
                ))
              )}
            </ul>
          </div>

          {/* Note Editor */}
          <div className="col-md-8">
            <div className="form-group">
              <input
                className="form-control note-title"
                placeholder="Note Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                readOnly={!!activeNote?.id}
              />
            </div>
            <div className="form-group">
              <textarea
                className="form-control note-textarea"
                placeholder="Note Text"
                rows="10"
                value={text}
                onChange={(e) => setText(e.target.value)}
                readOnly={!!activeNote?.id}
              ></textarea>
            </div>
            <button className="btn btn-secondary mr-2 new-note" onClick={handleNewNote}>
              New Note
            </button>
            <button
              className="btn btn-primary save-note"
              onClick={handleSave}
              style={{ display: !title.trim() || !text.trim() ? 'none' : 'inline' }}
            >
              Save Note
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
