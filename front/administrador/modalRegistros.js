const openModalRegistroBtn = document.getElementById('openModalRegistroBtn');
const closeModalRegistroBtn = document.getElementById('closeRegistroModalbtn');
const modalRegistro = document.getElementById('registroModal');
const modalRegistroForm = document.getElementById('modalFormRegistro');
const btnEnviarRegistro = document.getElementById('btnEnviarRegistro');
let tituloModalRegistro = document.getElementById('tituloRegistroModal')

openModalRegistroBtn.addEventListener('click', () => {
    modalRegistro.style.display = 'block';
});

closeModalRegistroBtn.addEventListener('click', () => {
    modalRegistro.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modalRegistro.style.display = 'none';
    }
});

modalRegistroForm.addEventListener('submit', (event) => {
    event.preventDefault();
    modalRegistro.style.display = 'none'; 
});
