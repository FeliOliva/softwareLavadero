document.addEventListener("DOMContentLoaded", function () {
  mostrarInicio();
  const navbarButton = document.querySelector(".navbar-toggler");
  const desktopNavbar = document.querySelector(".toggle-desktop");
  const mobileNavbar = document.querySelector(".toggle-mobile");

  function toggleNavElements() {
    if (window.innerWidth < 992) {
      desktopNavbar.style.display = "none";
      mobileNavbar.style.display = "block";
    } else {
      desktopNavbar.style.display = "block";
      mobileNavbar.style.display = "none";
    }
  }

  toggleNavElements();

  window.addEventListener("resize", toggleNavElements);

  navbarButton.addEventListener("click", function () {
    if (window.innerWidth < 992) {
      mobileNavbar.style.display = "block";
    } else {
      desktopNavbar.style.display = "block";
    }
  });
});

const tablaContainer = document.getElementById("tablaContainer");
let tituloContainer = document.getElementById("titulo");
let parrafoContainer = document.getElementById("parrafo");
const esAdminString = localStorage.getItem("esAdmin");
const esAdmin = JSON.parse(esAdminString);
let divBuscar = document.getElementById("busqueda");
let labelBuscar = document.getElementById("parametroLabel");
let btnBuscar = document.getElementById("buscarParametro");
let usuario;
let ordenar = document.getElementById("orderByEstado");
if (localStorage.getItem("Usuario") === "adminLavadero") {
  usuario = "administrador del lavadero";
} else {
  usuario = "operario del lavadero";
}
async function mostrarInicio() {
  openModalBtn.style.display = "none";
  openServicModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "none";
  openModalRegistroBtn.style.display = "none";
  tablaContainer.innerHTML = "";
  tituloContainer.textContent = "Bienvenido al software del lavadero";
  parrafoContainer.textContent = "Ingresaste como " + usuario;
  divBuscar.style.display = "none";
  ordenar.style.display = "none";
}
async function mostrarEstadisticas() {
  tablaContainer.innerHTML = "";
  openServicModalBtn.style.display = "none";
  openModalRegistroBtn.style.display = "none";
  openModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "none";
  tituloContainer.textContent = "Estadisticas";
  parrafoContainer.textContent = "Proximamente";
  divBuscar.style.display = "none";
  ordenar.style.display = "none";
}
