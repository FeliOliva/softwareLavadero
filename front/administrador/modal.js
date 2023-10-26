const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('myModal');
const modalForm = document.getElementById('modalForm');
const btnEnviar = document.getElementById('btnEnviar')
let tituloModal = document.getElementById('tituloModal')

openModalBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

modalForm.addEventListener('submit', (event) => {
    event.preventDefault();
    modal.style.display = 'none'; 
});
