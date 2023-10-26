const openServicModalBtn = document.getElementById('openModalServiceBtn');
const closeModalServicBtn = document.getElementById('closeServiceModalBtn');
const modalServicio = document.getElementById('servicioModal');
const modalServicForm = document.getElementById('modalFromServicio');
const btnEnviarServicio = document.getElementById('btnEnviarServicio');
let tituloModalServic = document.getElementById('tituloServicioModal')

openServicModalBtn.addEventListener('click', () => {
    modalServicio.style.display = 'block';
});

closeModalServicBtn.addEventListener('click', () => {
    modalServicio.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modalServicio.style.display = 'none';
    }
});

modalServicForm.addEventListener('submit', (event) => {
    event.preventDefault();
    modalServicio.style.display = 'none'; 
});
