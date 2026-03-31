import { useState, useEffect } from "react";
import { db } from "./firebase";
import { collection, addDoc, onSnapshot, query, orderBy } from "firebase/firestore";
import "./App.css";

function App() {
  const [note, setNote] = useState("");
  const [notesList, setNotesList] = useState([]); // This will hold our list of notes

  // This block fetches the notes from Firebase and updates in real-time
  useEffect(() => {
    const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notesArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotesList(notesArray);
    });

    return () => unsubscribe();
  }, []);

  const saveNote = async () => {
    if (!note.trim()) {
      alert("Please enter some text first!");
      return; 
    }
    
    try {
      await addDoc(collection(db, "notes"), {
        text: note,
        createdAt: new Date()
      });
      setNote(""); // Clear the input box after saving
      
    } catch (error) {
      alert("FIREBASE ERROR: " + error.message);
      console.error(error);
    }
  };

  return (
    <div className="app-container">
      <div className="glass-card">
        <h1>Modern Note App</h1>
        <p>Connected to Firebase</p>
        
        <div className="input-group">
          <input
            type="text"
            placeholder="Type a beautiful note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
          <button onClick={saveNote}>Save Note</button>
        </div>

        {/* This is the new section that displays your notes! */}
        <div className="notes-display">
          {notesList.map((n) => (
            <div key={n.id} className="note-item">
              {n.text}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default App;