var map = L.map('map').setView([-32.411696, -63.256528], 105);


L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

L.marker([-32.411696, -63.256528]).addTo(map)
    .bindPopup('¡Lavadero Güemes!')
    .openPopup();

function gracias() {
    alert('¡Gracias por enviar tu formulario!');

}

const tablaContainer = document.getElementById("tablaContainer");

async function mostrarServicios() {
    fetch('http://localhost:3000/api/servicios/')
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            tablaContainer.innerHTML = "";
            let tabla = document.createElement("table");
            tabla.classList = "estilostabla";
            tabla.id = "miTabla";
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");
            /* Encabezados */
            let encabezado = document.createElement("tr");

            let idHeader = document.createElement("th");
            idHeader.textContent = "ID";
            encabezado.appendChild(idHeader);

            let nombreHeader = document.createElement("th");
            nombreHeader.textContent = "Nombre";
            encabezado.appendChild(nombreHeader);


            let costoHeader = document.createElement("th");
            costoHeader.textContent = "Costo";
            encabezado.appendChild(costoHeader);

            let tipoVehiculoHeader = document.createElement("th");
            tipoVehiculoHeader.textContent = "Tipo de Vehículo";
            encabezado.appendChild(tipoVehiculoHeader);

            thead.appendChild(encabezado);

            /* Registros */
            for (let i = 0; i < data.length; i++) {
                let registro = data[i];

                let fila = document.createElement("tr");

                let idCell = document.createElement("td");
                idCell.textContent = registro.id;
                fila.appendChild(idCell);

                let nombreCell = document.createElement("td");
                nombreCell.textContent = registro.nombre;
                fila.appendChild(nombreCell);


                let costoCell = document.createElement("td");
                costoCell.textContent = registro.costo;
                fila.appendChild(costoCell);

                let tipoVehiculoCell = document.createElement("td");
                tipoVehiculoCell.textContent = registro.tipo_vehiculo;
                fila.appendChild(tipoVehiculoCell);
                tbody.appendChild(fila);
            }

            tabla.appendChild(thead);
            tabla.appendChild(tbody);
            tablaContainer.appendChild(tabla);
        })
};
mostrarServicios();