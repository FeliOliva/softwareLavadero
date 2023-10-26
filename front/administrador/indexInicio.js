document.addEventListener('DOMContentLoaded', function () {

    const navbarButton = document.querySelector('.navbar-toggler');
    const desktopNavbar = document.querySelector('.toggle-desktop');
    const mobileNavbar = document.querySelector('.toggle-mobile');

    function toggleNavElements() {
        if (window.innerWidth < 992) {
            desktopNavbar.style.display = 'none';
            mobileNavbar.style.display = 'block';
        } else {
            desktopNavbar.style.display = 'block';
            mobileNavbar.style.display = 'none';
        }
    }

    toggleNavElements();

    window.addEventListener('resize', toggleNavElements);

    navbarButton.addEventListener('click', function () {
        if (window.innerWidth < 992) {
            mobileNavbar.style.display = 'block';
        } else {
            desktopNavbar.style.display = 'block';
        }
    });
});

const tablaContainer = document.getElementById("tablaContainer");
let tituloContainer = document.getElementById("titulo");
let parrafoContainer = document.getElementById("parrafo")
async function mostrarInicio() {
    openModalBtn.style.display = 'none'
    openServicModalBtn.style.display = 'none'
    openClienteModalBtn.style.display = 'none'
    tablaContainer.innerHTML = "";
    tituloContainer.textContent = "Bienvenido al software del lavadero";
    parrafoContainer.textContent = "Este es el inicio"

}
async function mostrarEstadisticas() {
    tablaContainer.innerHTML = "";
    openServicModalBtn.style.display = 'none'
    openModalBtn.style.display = 'none'
    openClienteModalBtn.style.display = 'none'
    tituloContainer.textContent = "Estadisticas";
    parrafoContainer.textContent = "Proximamente"
}
