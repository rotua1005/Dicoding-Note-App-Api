export default class NotesComponent extends HTMLElement {
    constructor() {
        super();
        this.notes = []; // Inisialisasi data catatan
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        document.addEventListener('newNoteAdded', this.handleNewNoteAdded.bind(this));
        this.renderLoading(); // Tampilkan loading saat komponen terhubung
        setTimeout(() => {
            this.fetchNotes(); // Panggil method untuk mengambil catatan dari server setelah 2 detik
        }, 2000); // Mengurangi waktu penundaan menjadi 2 detik
    }

    fetchNotes() {
        fetch('https://notes-api.dicoding.dev/v2/notes')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch notes');
                }
                return response.json();
            })
            .then(data => {
                this.notes = data.data;
                this.renderNotes();
            })
            .catch(error => {
                console.error('Error fetching notes:', error);
                this.renderError();
            });
    }

    fetchSingleNote(noteId) {
        return fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch single note');
                }
                return response.json();
            })
            .then(data => {
                if (!data.data) {
                    throw new Error('Note data is null');
                }
                return data.data;
            });
    }

    fetchArchivedNotes() {
        return fetch('https://notes-api.dicoding.dev/v2/notes/archived')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch archived notes');
                }
                return response.json();
            })
            .then(data => {
                return data.data;
            });
    }

    renderNotes() {
        const notesContainer = document.createElement('div');
        notesContainer.id = 'notes-container';

        this.notes.forEach((note, index) => {
            const noteElement = document.createElement('div');
            noteElement.classList.add('note-content');
            noteElement.innerHTML = `
                <h2>${note.title}</h2>
                <p>${note.body}</p>
                <p>Created at: ${note.createdAt}</p>
                <p>Archived: ${note.archived}</p> 
                <button class="delete-button" data-note-id="${note.id}">Delete Note</button>
                <button class="detail-button" data-note-id="${note.id}">View Detail</button>
            `;

            // Menambahkan animasi dengan anime.js
            noteElement.style.opacity = 0;
            anime({
                targets: noteElement,
                opacity: 1,
                translateY: [20, 0],
                easing: 'easeOutQuad',
                duration: 500,
                delay: index * 100 // Memberikan delay untuk setiap catatan
            });

            notesContainer.appendChild(noteElement);
        });

        const style = document.createElement('style');
        style.textContent = `
            #notes-container {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 20px;
                padding: 20px;
                justify-content: space-between;
            }
            
            .note-content {
                background-color: #121212;
                color: rgb(206, 199, 247);
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                padding: 20px;
                box-sizing: border-box;
                transition: transform 0.2s ease-out;
            }

            .delete-button {
                background-color: #f44336;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 12px;
                cursor: pointer;
            }

            .delete-button:hover {
                background-color: #d32f2f;
            }

            .detail-button {
                background-color: #3936f4;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 12px;
                cursor: pointer;
            }

            .detail-button:hover {
                background-color: rgb(24, 21, 199);
            }
        `;

        // Kosongkan shadow DOM sebelum menambahkan elemen baru
        this.shadowRoot.innerHTML = '';
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(notesContainer);

        // Tambahkan event listener untuk tombol hapus
        notesContainer.querySelectorAll('.delete-button').forEach(button => {
            button.addEventListener('click', this.handleDeleteNote.bind(this));
        });

        // Tambahkan event listener untuk tombol "View Detail"
        notesContainer.querySelectorAll('.detail-button').forEach(detailButton => {
            detailButton.addEventListener('click', this.handleViewDetail.bind(this));
        });
    }

    renderError() {
        const errorContainer = document.createElement('div');
        errorContainer.textContent = 'Failed to fetch notes. Please try again later.';
        this.shadowRoot.appendChild(errorContainer);
    }

    renderLoading() {
        const loadingIndicator = document.createElement('div');
        loadingIndicator.id = 'loadingIndicator';
        loadingIndicator.innerHTML = '<div class="loading-spinner"></div>';
        this.shadowRoot.appendChild(loadingIndicator);

        const style = document.createElement('style');
        style.textContent = `
            .loading-spinner {
                border: 4px solid rgba(0, 0, 0, 0.1);
                border-left-color: #3498db;
                border-radius: 50%;
                width: 50px;
                height: 50px;
                animation: spin 1s linear infinite;
                margin: auto;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }
            
            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }
        `;
        this.shadowRoot.appendChild(style);
    }

    handleNewNoteAdded(event) {
        const { title, body } = event.detail;
        // Tambahkan catatan baru ke dalam daftar catatan
        const newNote = { title, body, createdAt: new Date().toISOString(), archived: false };
        this.notes.push(newNote);
        // Render ulang daftar catatan
        this.renderNotes();
    }

    handleDeleteNote(event) {
        const noteId = event.target.dataset.noteId;
        fetch(`https://notes-api.dicoding.dev/v2/notes/${noteId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete note');
            }
            return response.json();
        })
        .then(data => {
            // Hapus catatan dari daftar catatan
            this.notes = this.notes.filter
            (note => note.id !== noteId);
            // Render ulang daftar catatan
            this.renderNotes();
            console.log('Note deleted successfully:', data); // Menampilkan pesan ke konsol jika penghapusan berhasil
            // Show success alert
            Swal
            .fire({
                icon: 'success',
                title: 'Success',
                text: 'Note deleted successfully',
            });
        })
        .catch(error => {
            console.error('Error deleting note:', error);
            // Tampilkan pesan error jika terjadi kesalahan saat menghapus catatan
            // Show error alert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete note',
            });
        });
    }

    handleViewDetail(event) {
        const noteId = event.target.dataset.noteId;
        this.fetchSingleNote(noteId)
            .then(note => {
                // Tampilkan detail catatan
                console.log('Note Detail:', note);
                // Contoh: Menampilkan detail catatan menggunakan alert
                Swal.fire({
                    title: note.title,
                    html: `
                        <p><strong>Body:</strong> ${note.body}</p>
                        <p><strong>Created at:</strong> ${note.createdAt}</p>
                        <p><strong>Archived:</strong> ${note.archived}</p>
                    `,
                    showCloseButton: true,
                    showCancelButton: false,
                    focusConfirm: false,
                    confirmButtonText: 'Close',
                });
            })
            .catch(error => {
                console.error('Error fetching single note:', error);
                // Tampilkan pesan error jika terjadi kesalahan saat mengambil detail catatan
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to fetch note detail',
                });
            });
    }
}

// Mendefinisikan custom element 'notes-component'
customElements.define('notes-component', NotesComponent);
