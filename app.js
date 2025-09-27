// Simple in-memory list. Replace with your existing array/storage if needed.
const initialMovies = [
  'The Intern', 'Prey', 'Code 45', 'Inception', 'Avengers', 'Movie Name 3'
];
let movies = [...initialMovies];
let editingIndex = null;

// DOM refs
const list = document.getElementById('movieList');
const addForm = document.getElementById('addForm');
const movieInput = document.getElementById('movieInput');

const modal = document.getElementById('modal');
const editInput = document.getElementById('editInput');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

function render(){
  list.innerHTML = '';
  movies.forEach((title, idx) => {
    const li = document.createElement('li');
    li.className = 'item';

    const text = document.createElement('div');
    text.className = 'item__title';
    text.textContent = title;

    const edit = document.createElement('button');
    edit.className = 'btn btn--edit';
    edit.textContent = 'Edit';
    edit.addEventListener('click', () => openModal(idx));

    const del = document.createElement('button');
    del.className = 'btn btn--del';
    del.textContent = 'Delete';
    del.addEventListener('click', () => {
      movies.splice(idx,1);
      render();
    });

    li.append(text, edit, del);
    list.appendChild(li);
  });
}

addForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const val = movieInput.value.trim();
  if(!val) return;
  movies.push(val);
  movieInput.value='';
  render();
});

function openModal(index){
  editingIndex = index;
  editInput.value = movies[index];
  modal.setAttribute('aria-hidden','false');
  editInput.focus();
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  editingIndex = null;
}

saveBtn.addEventListener('click', () => {
  const v = editInput.value.trim();
  if(v && editingIndex !== null){
    movies[editingIndex] = v;
    render();
  }
  closeModal();
});

cancelBtn.addEventListener('click', closeModal);
modal.addEventListener('click', (e) => {
  if(e.target === modal) closeModal(); // click outside
});

// esc to close
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false'){
    closeModal();
  }
});

render();
