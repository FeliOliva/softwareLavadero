const openClienteModalBtn = document.getElementById('openModalClienteBtn');
const closeModalClienteBtn = document.getElementById('closeClienteModalbtn');
const modalCliente = document.getElementById('clienteModal');
const modalClienteForm = document.getElementById('modalFromCliente');
const btnEnviarCliente = document.getElementById('btnEnviarCliente');
let tituloModalCliente = document.getElementById('tituloClienteModal')

openClienteModalBtn.addEventListener('click', () => {
    modalCliente.style.display = 'block';
});

closeModalClienteBtn.addEventListener('click', () => {
    modalCliente.style.display = 'none';
});
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modalCliente.style.display = 'none';
    }
});

modalClienteForm.addEventListener('submit', (event) => {
    event.preventDefault();
    modalCliente.style.display = 'none'; 
});
