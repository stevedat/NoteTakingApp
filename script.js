const newNoteInput = document.getElementById('new-note');
const saveButton = document.getElementById('save-button');
const notesList = document.getElementById('notes-list');
let isEmojiPickerVisible = false; // Flag for emoji picker visibility


// Load notes from local storage
// ... (loadNotes function remains the same) ...

//Emoji Picker function

function toggleEmojiPicker() {

  const emojiPicker = document.getElementById('emoji-picker');

  if (!emojiPicker) { // Create if it doesn't exist
    const picker = new EmojiPicker({
        trigger: [
            {
                selector: '#emoji-button', // Trigger element ID
                insertInto: '#new-note', // Text area to insert emoji
            },

        ],
        closeButton: true,
    });
    picker.render(); // Render the emoji picker


  }


}





function saveNote() {
    // ... (saveNote function remains the same) ...
}

function addNoteToList(noteText, index = null) {
    // ... (addNoteToList function remains the same) ...
}


function deleteNote(noteItem, noteText) {
   // ... (deleteNote function remains the same) ...
}




saveButton.addEventListener('click', saveNote);

// Load initial notes
loadNotes();

// Edit Functionality
// ... (double click edit functionality remains the same) ...


//EMOJI button

const emojiButton = document.createElement('button');
emojiButton.textContent = '😀'; // You can change the emoji if you prefer.
emojiButton.id = 'emoji-button'
emojiButton.addEventListener('click', toggleEmojiPicker);
document.body.appendChild(emojiButton);




//Hashtags
newNoteInput.addEventListener('input', function() {
  const text = this.value;
  const hashtags = text.match(/#[\w]+/g) || []; // Extract hashtags
    console.log("Hashtags", hashtags)

  // You can now process the hashtags, e.g., display them below the input
    const hashtagsContainer = document.getElementById('hashtags') || createHashtagsContainer() ; // Get or create container

    hashtagsContainer.innerHTML = ""; // Clear previous hashtags


    hashtags.forEach(hashtag => {

        const hashtagElement = document.createElement('span');
        hashtagElement.textContent = hashtag;
        hashtagElement.classList.add('hashtag');
        hashtagsContainer.appendChild(hashtagElement)
    });


});



function createHashtagsContainer(){
    const hashtagsContainer = document.createElement('div');
    hashtagsContainer.id = 'hashtags';
    document.body.appendChild(hashtagsContainer); // Append to the body or wherever you want it
      return hashtagsContainer;


}




// Add EmojiPicker library using a script tag (you'll need to include the library)
// Example (if using jsdelivr CDN):
// <script src="https://cdn.jsdelivr.net/npm/emoji-picker-element@latest/index.js"></script>
