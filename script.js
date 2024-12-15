const noteArea = document.getElementById('note-area');
const saveButton = document.getElementById('save-button');
const newNoteButton = document.getElementById('new-note-button');
const notesList = document.getElementById('notes-list');
const boldButton = document.getElementById('bold-button')
const italicButton = document.getElementById('italic-button')
const underlineButton = document.getElementById('underline-button');

function saveNote() {
  const noteContent = noteArea.innerHTML;
  if (noteContent.trim() !== "") {
    const noteItem = document.createElement('li');
    noteItem.innerHTML = noteContent;  //innerHTML to preserve HTML formatting
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'x';
        deleteButton.classList.add('close');
        noteItem.appendChild(deleteButton);

    notesList.appendChild(noteItem);
    // Save to local storage
    saveNotesToLocalStorage();


            // Delete functionality
            deleteButton.addEventListener('click', () => {

                notesList.removeChild(noteItem);
                  saveNotesToLocalStorage(); // Update local storage after deleting

            });
    noteArea.innerHTML = ""; // Clear for new note
  }
}


function loadNotesFromLocalStorage() {
    const savedNotes = localStorage.getItem('notes');
    if(savedNotes){
        notesList.innerHTML = savedNotes;   //load saved notes

            // Add delete event listeners to loaded notes as well
        const deleteButtons = document.querySelectorAll('.close');
        deleteButtons.forEach(button => {
            button.addEventListener('click', () => {

                 const noteItem = button.parentNode; // Get the parent <li>
                notesList.removeChild(noteItem);
                saveNotesToLocalStorage();

            });
        });

    }

}


function saveNotesToLocalStorage(){
      localStorage.setItem('notes', notesList.innerHTML) //save notes to local storage.
}

function newNote() {
    noteArea.innerHTML = ''; // Clear the note area
}


// Add Event Listeners for formatting buttons (bold, italic, underline)
boldButton.addEventListener('click', () => {
  document.execCommand('bold', false, null);
});

italicButton.addEventListener('click', () => {
  document.execCommand('italic', false, null);
});

underlineButton.addEventListener('click', () => {
    document.execCommand('underline', false, null);
});


saveButton.addEventListener('click', saveNote);
newNoteButton.addEventListener('click', newNote)


// Load notes on page load
loadNotesFromLocalStorage();
