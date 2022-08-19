import React, { useEffect, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Note from "./Note";
import CreateArea from "./CreateArea";
import {dkeeper} from "../../../declarations/dkeeper"

function App() {
  const [notes, setNotes] = useState([]);

  function addNote(newNote) {
    setNotes(prevNotes => {
      dkeeper.createNewNote(newNote.title,newNote.content)
      
      // return [...prevNotes, newNote];
      return [newNote,...prevNotes];

    });
    console.log(notes)
  }
  useEffect(()=>{
    // alert("use effect active")
    fetchData()
  },[])
  async function fetchData(){
    const notesArray = await dkeeper.getNotes()
    setNotes(notesArray)
  }

  async function deleteNote(id) {
    await dkeeper.removeNote(id)
    setNotes(prevNotes => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
