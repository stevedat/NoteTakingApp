const newNoteInput = document.getElementById('new-note');
const saveButton = document.getElementById('save-button');
const notesList = document.getElementById('notes-list');

// Load notes from local storage
function loadNotes() {
  const savedNotes = localStorage.getItem('notes');
  if (savedNotes) {
    const notesArray = JSON.parse(savedNotes);
    notesArray.forEach(addNoteToList); // Directly use addNoteToList
  }
}

function saveNote() {
  const noteText = newNoteInput.value.trim();
  if (noteText !== "") {
    addNoteToList(noteText);

    // Save to local storage
    const notesArray = JSON.parse(localStorage.getItem('notes') || '[]');
    notesArray.push(noteText);
    localStorage.setItem('notes', JSON.stringify(notesArray));

    newNoteInput.value = ''; // Clear the input field
    newNoteInput.focus();    // Put the cursor back in the input field


  }
}

function addNoteToList(noteText, index = null) {   //add index parameter
  const newNoteItem = document.createElement('li');
  newNoteItem.classList.add('note');
  newNoteItem.textContent = noteText;

  const deleteButton = document.createElement('span');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () => deleteNote(newNoteItem, noteText)); // Pass noteText

  newNoteItem.appendChild(deleteButton);
  if(index === null){
      notesList.appendChild(newNoteItem)
  } else{
      notesList.insertBefore(newNoteItem, notesList.children[index])  //insert at specific location
  }

}

function deleteNote(noteItem, noteText) {
  notesList.removeChild(noteItem);

  // Remove from local storage
  const notesArray = JSON.parse(localStorage.getItem('notes'));
  const index = notesArray.indexOf(noteText);    //find the index of the element to be removed
  if (index > -1) {
    notesArray.splice(index, 1);
    localStorage.setItem('notes', JSON.stringify(notesArray));
  }
}




saveButton.addEventListener('click', saveNote);

// Load initial notes
loadNotes();


//Add an event listener to allow editing of a note when you double click.

notesList.addEventListener('dblclick', function(event){

    const noteItem = event.target.closest('.note')  //find the note element when double clicked.


    if(noteItem){
        const originalText = noteItem.textContent.slice(0, -1)  //get original text
        noteItem.textContent = ""; //clear out the text content to allow input.

        const editInput = document.createElement('textarea');
        editInput.value = originalText; //set the text area value to the original value
        editInput.classList.add('edit-input')  //add a class for styling purpose.
        noteItem.appendChild(editInput)

        editInput.addEventListener('blur', () => { //save changes when user clicks outside of the input field.
            const newText = editInput.value;
            const notesArray = JSON.parse(localStorage.getItem('notes'));
            const index = notesArray.indexOf(originalText);

            if(index > -1){
              notesArray[index] = newText;  //update the array
              localStorage.setItem('notes', JSON.stringify(notesArray))  //update local storage.

              noteItem.textContent = newText;  //update the content in the note.
              addNoteToList(newText, index) //add the update node to the same location where the old one was.
              noteItem.remove(); // remove the old noteItem from the DOM.

            }

        })

        editInput.focus()


    }



})


//add some basic CSS Styling for the edit input field.
