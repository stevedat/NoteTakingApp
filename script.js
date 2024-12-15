const notesContainer = document.getElementById('notes-container');
const newNoteInput = document.querySelector('#new-note textarea');
const addNoteButton = document.getElementById('add-note');

let notes = []; // Array to store note data


// Function to add a new note
function addNote() {
    const noteText = newNoteInput.value.trim();


  if (noteText !== "") {
        const note = {

              // Extract title (first line) and content
              title: noteText.split('\n')[0] || 'Untitled Note', // Default to 'Untitled Note'
              content: noteText.split('\n').slice(1).join('\n') || '',  // Rest of the content

        }

      notes.push(note);
      renderNotes();
      newNoteInput.value = ''; // Clear input field
  }
}




function deleteNote(index) {
  notes.splice(index, 1);
  renderNotes(); // Re-render the notes list
}


function renderNotes() {

  notesContainer.innerHTML = ''; // Clear existing notes

  notes.forEach((note, index) => {


        const noteElement = document.createElement('div');
      noteElement.classList.add('note');
            noteElement.innerHTML = `
                <div class="note-title">${note.title}</div>
                <div class="note-content">${note.content}</div>

            `

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.textContent = '×';  // Use multiplication symbol for delete
      deleteButton.addEventListener('click', () => deleteNote(index));
      noteElement.appendChild(deleteButton);

      notesContainer.appendChild(noteElement);




  });

    // Store updated notes in local storage
    localStorage.setItem('notes', JSON.stringify(notes));


}


// Load notes from local storage on page load
function loadNotes() {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    notes = JSON.parse(storedNotes);
    renderNotes();
  }
}


addNoteButton.addEventListener('click', addNote);

// Load initial notes on page load
loadNotes();
