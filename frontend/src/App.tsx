import React, { useState } from 'react';
import './App.css';

function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Dummy notes
    const [notes, setNotes] = useState([
        { id: 1, title: "Birinshi eske alu", content: "Bwl birinshi eske alu jazbasy." },
        { id: 2, title: "Ekinshi eske alu", content: "Bwl ekinshi eske alu jazbasy." },
        { id: 3, title: "Üshinshi eske alu", content: "Bwl üshinshi eske alu jazbasy." },
    ]);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("title: ", title);
        console.log("desc: ", description);

        // Adding a new note
        const newNote = {
            id: notes.length + 1,
            title,
            content: description
        };
        setNotes([...notes, newNote]);

        // Clear input fields
        setTitle('');
        setDescription('');
    };

    return (
        <div className="app-container">
            <form className="app-form" onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    type="text"
                    placeholder="Atau"
                    required
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Jazba"
                    rows={10}
                    required
                />
                <button type="submit">Jiberu</button>
            </form>

            {/* Display Notes */}
            <div className="notes-grid">
                {notes.map((note) => (
                    <div key={note.id} className="notes-item">
                        <div className="notes-header">
                            <button>X</button>
                        </div>
                        <h2>{note.title}</h2>
                        <p>{note.content}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
