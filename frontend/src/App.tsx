import React, {useEffect, useState} from 'react';
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
    const [notes, setNotes] = useState<Note[]>([]);

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await fetch('http://localhost:5001/api/notes');
                const notesFetched: Note[] = await response.json();
                console.log(notesFetched);
                setNotes(notesFetched);
            } catch (err) {
                console.log(err);
            }

        }

        fetchNotes();
    }, [])


    const handleNoteClick = (id: number) => {
        const selectedNote: Note | undefined = notes.find(note => note.id === id); // Find the note by ID

        if (selectedNote) {
            setSelectedNoteId(id);
            setEditing(true);
            setTitle(selectedNote.title);
            setDescription(selectedNote.content);
        }
    }
    const handleEditNote = async () => {
        if (!selectedNoteId) return; // Prevent errors if no note is selected


        try {
            const response = await fetch(`http://localhost:5001/api/notes/${selectedNoteId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: title,
                    content: description,
                })
            });

            const notesFetched = await response.json();

            const updatedNoteList = notes.map((note) => note.id === selectedNoteId ? notesFetched : note);
            setNotes(updatedNoteList);

            setTitle("");
            setDescription("");
            setEditing(false);
            setSelectedNoteId(null);

            // Reset input fields and exit editing mode
        } catch (err) {
            console.log(err);
        }

    };

    const handleCancel = () => {
        setTitle("");
        setDescription("");
        setEditing(false);
        setSelectedNoteId(null);
    }

    const handleAddNote = async (event: React.FormEvent) => {
        event.preventDefault();
        console.log("title: ", title);
        console.log("desc: ", description);

        try {
            const response = await fetch(`http://localhost:5001/api/notes/`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    content: description,
                })
            });

            const newNote = await response.json();

            setNotes([...notes, newNote]);

            // Clear input fields
            setTitle('');
            setDescription('');
        } catch (err) {
            console.log(err);
        }
        // Adding a new note
        // const newNote: Note = {
        //     id: notes.length + 1,
        //     title: title,
        //     content: description
        // };

    };

    const handleDeleteNote = async (event: React.FormEvent, id: number) => {
        event.preventDefault();
        event.stopPropagation();

        try{
            await fetch(`http://localhost:5001/api/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                }
            });


            setNotes(notes.filter((note) => note.id !== id));
        }
        catch(err) {
            console.log(err);
        }



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
