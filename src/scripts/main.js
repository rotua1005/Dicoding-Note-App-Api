import AddNoteForm from './addNoteForm' 
import NotesComponent from './notesComponen'
import FooterComponent from './footer';

// Buat instance dari AddNoteForm dan NotesComponent di luar fungsi main
const addNoteForm = new AddNoteForm();
const notesComponent = new NotesComponent();
const footer = new FooterComponent();

function main() {
  document.addEventListener('DOMContentLoaded', () => {
    const buttonSave = document.querySelector('#buttonSave');

    // Menambahkan event listener untuk tombol "Save" jika elemen ditemukan
    if (buttonSave) {
      buttonSave.addEventListener('click', function () {
        const inputNotesTitle = document.querySelector('#inputNotesTitle');
        const inputNotesDescription = document.querySelector('#inputNotesDescription');

        const note = {
          title: inputNotesTitle.value,
          body: inputNotesDescription.value,
        };

        // Menggunakan method addNote dari AddNoteForm
        addNoteForm.addNote(note.title, note.body);
      });
    }

    // Append the footer component to the document body
    document.body.appendChild(footer);
  });
}

export default main;
