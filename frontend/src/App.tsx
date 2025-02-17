import React, {useState} from 'react';
import './App.css';


type Note = {
    id: number;
    title: string;
    content: string;
}

function App() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [editing, setEditing] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);

    // Dummy notes
    const [notes, setNotes] = useState<Note[]>([
        {id: 1, title: "Birinshi eske alu", content: "Bwl birinshi eske alu jazbasy."},
        {id: 2, title: "Ekinshi eske alu", content: "Bwl ekinshi eske alu jazbasy."},
        {id: 3, title: "Üshinshi eske alu", content: "Bwl üshinshi eske alu jazbasy."},
    ]);


    const handleNoteClick = (id: number) => {
        const selectedNote: Note | undefined = notes.find(note => note.id === id); // Find the note by ID

        if (selectedNote) {
            setSelectedNoteId(id);
            setEditing(true);
            setTitle(selectedNote.title);
            setDescription(selectedNote.content);
        }
    }
    const handleEditNote = () => {
        if (!selectedNoteId) return; // Prevent errors if no note is selected

        setNotes((prevNotes) =>
            prevNotes.map((note) =>
                note.id === selectedNoteId ? {...note, title, content: description} : note
            )
        );

        // Reset input fields and exit editing mode
        setTitle("");
        setDescription("");
        setEditing(false);
        setSelectedNoteId(null);
    };

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setEditing(false);
        setSelectedNoteId(null);
    }

    const handleAddNote = (event: React.FormEvent) => {
        event.preventDefault();
        console.log("title: ", title);
        console.log("desc: ", description);

        // Adding a new note
        const newNote: Note = {
            id: notes.length + 1,
            title: title,
            content: description
        };
        setNotes([...notes, newNote]);

        // Clear input fields
        setTitle('');
        setDescription('');
    };

    const handleDeleteNote = (event: React.FormEvent, id: number) => {
        event.preventDefault();
        event.stopPropagation();

        setNotes(notes.filter((note) => note.id !== id));

    }

    return (
        <div className="app-container">
            <form className="app-form" onSubmit={handleAddNote}>
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

                {
                    editing ?
                        <div className="form-edit">
                            <button className="edit" onClick={handleEditNote}>Ozgertu</button>
                            <button className="cancel" onClick={handleCancel}>Bas tartu</button>
                        </div>
                        :
                        <button type="submit">Jiberu</button>
                }


            </form>

            {/* Display Notes */}
            <div className="notes-grid">
                {notes.map((note) => (
                    <div key={note.id} className="notes-item" onClick={() => handleNoteClick(note.id)}>
                        <div className="notes-header">
                            <button onClick={(event) => handleDeleteNote(event, note.id)}>X</button>
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
