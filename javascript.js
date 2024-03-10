// sets the selected note to an empty object
let selectedNote = {};

// opens the note modal and sets the title and content of the selected note
const openNoteModal = (note) => {
  document.getElementById("noteModal").style.display = "block";
  document.getElementById("updateNoteTitle").innerHTML = note.title;
  document.getElementById("updateNoteTitle").value = note.title;
  document.getElementById("updateNoteContent").innerHTML = note.content;
  selectedNote = note;
};

// closes the note modal
const closeUpdateForm = () => {
  document.getElementById("noteModal").style.display = "none";
};

// creates a note element
const createNote = (note) => {
  const noteElement = document.createElement("div");
  noteElement.className = "note";
  noteElement.innerHTML = `
      <h2>${note.title}</h2>
      <p>${note.content}</p>
    `;

  noteElement.addEventListener("click", () => openNoteModal(note));
  return noteElement;
};

// creates a new note when the save button is clicked
const createNewNote = () => {
  const title = document.getElementById("noteTitle").value;
  const content = document.getElementById("noteText").value;
  const note = { title, content };

  // using post to create a new note
  fetch("https://65ed3ec40ddee626c9b15d3d.mockapi.io/note", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(note),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error");
      }
    })
    .then(
      () => {
        document.getElementById("noteContainer").innerHTML = "";
        fetchNotes();
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteText").value = "";
        closeForm();
      },
      (error) => {
        console.log(error);
      }
    )
    .catch((error) => {
      console.log(error);
    });
};

// fetches all notes from the mock api
const fetchNotes = () => {
  // using the get method to fetch all notes
  fetch("https://65ed3ec40ddee626c9b15d3d.mockapi.io/note", {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error");
      }
    })
    .then((notes) => {
      // create a new note element for each note
      // sort notes based on the id
      notes.sort((a, b) => b.id - a.id);
      notes.forEach((note) => {
        const noteElement = createNote({
          title: note.title,
          content: note.content,
          id: note.id,
        });
        // append the note element to the note container
        document.getElementById("noteContainer").appendChild(noteElement);
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

const openForm = () => {
  document.getElementById("noteForm").style.display = "block";
};

const closeForm = () => {
  document.getElementById("noteForm").style.display = "none";
  document.getElementById("noteTitle").value = "";
  document.getElementById("noteText").value = "";
};

const deleteNote = () => {
  note = selectedNote;
  // using the delete method
  fetch(`https://65ed3ec40ddee626c9b15d3d.mockapi.io/note/${note.id}`, {
    method: "DELETE",
    headers: { "content-type": "application/json" },
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error");
      }
    })
    .then(
      () => {
        document.getElementById("noteContainer").innerHTML = "";
        fetchNotes();
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteText").value = "";
        closeUpdateForm();
      },
      (error) => {
        console.log(error);
      }
    )
    .catch((error) => {
      console.log(error);
    });
};

// updates the selected note
const updateNote = () => {
  const title = document.getElementById("updateNoteTitle").value;
  const content = document.getElementById("updateNoteContent").value;
  const note = { title, content, id: selectedNote.id };
  // using a put method to update the note
  fetch(`https://65ed3ec40ddee626c9b15d3d.mockapi.io/note/${note.id}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(note),
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error");
      }
    })
    .then(
      () => {
        document.getElementById("noteContainer").innerHTML = "";
        fetchNotes();
        document.getElementById("noteTitle").value = "";
        document.getElementById("noteText").value = "";
        closeUpdateForm();
      },
      (error) => {
        console.log(error);
      }
    )
    .catch((error) => {
      console.log(error);
    });
};

// event listeners
document.getElementById("addNote").addEventListener("click", openForm);
document.getElementById("cancelNote").addEventListener("click", closeForm);
document
  .getElementById("cancelNote2")
  .addEventListener("click", closeUpdateForm);
document.getElementById("deleteNote").addEventListener("click", deleteNote);
document.getElementById("updateNote").addEventListener("click", updateNote);
document.getElementById("saveNote").addEventListener("click", createNewNote);

// fetch all notes when the page loads
fetchNotes();
