const newNoteInput = document.getElementById('new-note');
const saveButton = document.getElementById('save-button');
const notesList = document.getElementById('notes-list');

function saveNote() {
    const noteText = newNoteInput.value.trim();
  if (noteText) {
      const newNote = document.createElement('li');
        newNote.textContent = noteText;
        const deleteButton = document.createElement('span');  // Create delete button
        deleteButton.textContent = 'x';
        deleteButton.classList.add('close');
        newNote.appendChild(deleteButton);


      notesList.appendChild(newNote);
        newNoteInput.value = ''; // Clear input

        // Delete functionality
            deleteButton.addEventListener('click', () => {
             notesList.removeChild(newNote);
            });
  }


}

saveButton.addEventListener('click', saveNote);
