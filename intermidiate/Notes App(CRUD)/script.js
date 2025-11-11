const addBtn = document.getElementById("add-note-btn");

addBtn.addEventListener("click", function () {
  // Get Value
  const title = document.getElementById("note-title").value;
  const content = document.getElementById("note-content").value;

  // validate content
  if (content.trim() === "") {
    alert("Note content cannot be empty");
    return;
  }
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  if (editingNoteId) {
    // 🟢 If editing, update existing note
    notes = notes.map((note) =>
      note.id === editingNoteId
        ? { ...note, title, content, time: new Date().toLocaleString() }
        : note
    );
    editingNoteId = null; // Reset after saving
    addBtn.innerText = "Add Note"; // Change button text back
  } else {
    // 🆕 If not editing, add new note
    const newNote = {
      id: Date.now(),
      title: title,   
      content: content,
      time: new Date().toLocaleString(),
    };
    notes.push(newNote);
  }

  // Save and refresh UI
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();

  // Clear input fields
  document.getElementById("note-title").value = "";
  document.getElementById("note-content").value = "";
});

function displayNotes() {
  const container = document.getElementById("notes-container");

  // Step 1: Read notes from localStorage
  const notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Step 2: Clear container to avoid duplicates
  container.innerHTML = "";

  // Step 3: Loop through notes array
  notes.forEach((note) => {
    // Step 4: Create a div for each note
    const noteDiv = document.createElement("div");
    noteDiv.classList.add("note");

    // Add content to the noteDiv
    noteDiv.innerHTML = `
      <h3>${note.title || "Untitled"}</h3>
      <p>${note.content}</p>
      <small>${note.time}</small>
      <br />
      <button onclick="editNote(${note.id})">Edit</button>
      <button onclick="deleteNote(${note.id})">Delete</button>
    `;

    // Step 5: Append noteDiv to the container
    container.appendChild(noteDiv);
  });
}

function deleteNote(id) {
  // Step 1: Get notes from localStorage
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  // Step 2: Filter out the note with the matching id
  notes = notes.filter((note) => note.id !== id);

  // Step 3: Save the updated notes back to localStorage
  localStorage.setItem("notes", JSON.stringify(notes));

  // Step 4: Re-display notes on screen
  displayNotes();
}

let editingNoteId = null; // Track which note is being edited

function editNote(id) {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  const noteToEdit = notes.find((note) => note.id === id);

  if (!noteToEdit) return;

  document.getElementById("note-title").value = noteToEdit.title;
  document.getElementById("note-content").value = noteToEdit.content;

  editingNoteId = id;
  addBtn.innerText = "Save Note";
}
