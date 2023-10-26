async function mostrarServicios() {
    tablaContainer.innerHTML = "";
    openModalBtn.style.display = 'none'
    openClienteModalBtn.style.display = 'none'
    openServicModalBtn.style.display = 'block'
    tituloContainer.textContent = "Servicios";
    parrafoContainer.textContent = "Estos son los servicios"
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

            let estadoHeader = document.createElement("th");
            estadoHeader.textContent = "Estado";
            encabezado.appendChild(estadoHeader);

            let accionesHeader = document.createElement("th");
            accionesHeader.textContent = "Acciones";
            encabezado.appendChild(accionesHeader);

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

                let estadoCell = document.createElement("td");
                estadoCell.textContent = registro.estado;
                fila.appendChild(estadoCell)

                let actualizarBtn = document.createElement('button');
                actualizarBtn.textContent = 'Actualizar';
                actualizarBtn.setAttribute('data-registro-id', registro.id);

                if (registro.estado === 'eliminado') {
                    actualizarBtn.disabled = true;
                }

                actualizarBtn.addEventListener('click', function () {
                    tituloModalServic.innerHTML = 'Actualizar servicio'
                    modalServicio.style.display = 'block';
                    btnEnviarServicio.onclick = actualizarServicio;
                    btnEnviarServicio.innerHTML = 'actualizar'
                    async function actualizarServicio() {
                        let tipoVehiculos = document.getElementById('tipoVehiculosServicio').value;
                        let idTipoVehiculo;
                        if (tipoVehiculos === 'auto') {
                            idTipoVehiculo = 1;
                        } else {
                            idTipoVehiculo = 2;
                        }
                        const dato = {
                            "nombre": document.getElementById('nombreServicio').value,
                            "costo": parseInt(document.getElementById('costo').value),
                            "idTipoVehiculo": idTipoVehiculo,
                            "id": registro.id
                        };
                        console.log(dato)
                        if (dato.nombre == "" || dato.costo < 0) {
                            alert('datos mal completados')
                        } else {
                            alert('Servicio actualizado correctamente')
                            await fetch(`http://localhost:3000/api/servicios`, {
                                method: "PUT",
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify(dato),
                            })
                                .then((response) => response.json())
                                .then((data) => {
                                    console.log("Respuesta:", data);
                                })
                                .catch((error) => {
                                    console.error("Error:", error);
                                });
                        }
                        tablaContainer.innerHTML = ""
                        mostrarServicios();
                    }
                }
                );

                fila.appendChild(actualizarBtn);

                let eliminarBtn = document.createElement("button");
                eliminarBtn.textContent = "Eliminar";
                eliminarBtn.addEventListener("click", function () {
                    if (registro.estado !== 'eliminado') {
                        const confirmar = confirm("¿Estás seguro de que deseas eliminar este registro?");
                        if (confirmar) {
                            fetch(`http://localhost:3000/api/servicios/${registro.id}`, {
                                method: "PUT",
                            })
                                .then((response) => {
                                    if (response.status === 204) {
                                        console.log("registro eliminado exitosamente")
                                    } else {
                                        console.log("Error al eliminar el registro.");
                                    }
                                })
                                .catch((error) => {
                                    console.error("Error al eliminar el registro:", error);
                                });
                        }
                        tablaContainer.innerHTML = ""
                        mostrarServicios();
                    }
                });
                if (registro.estado === 'eliminado') {
                    eliminarBtn.disabled = true;
                }
                fila.appendChild(eliminarBtn);

                tbody.appendChild(fila);
            }

            tabla.appendChild(thead);
            tabla.appendChild(tbody);
            tablaContainer.appendChild(tabla);
        });
    openServicModalBtn.addEventListener('click', () => {
        btnEnviarServicio.onclick = guardarServicios;
        tituloModalServic.innerHTML = 'Agregar Servicio'
        btnEnviarServicio.innerHTML = 'Guardar'
        async function guardarServicios() {
            let tipoVehiculos = document.getElementById('tipoVehiculos').value;
            let idTipoVehiculo;

            if (tipoVehiculos === 'auto') {
                idTipoVehiculo = 1;
            } else {
                idTipoVehiculo = 2;
            }

            const dato = {
                "nombre": document.getElementById('nombreServicio').value,
                "costo": document.getElementById('costo').value,
                "idTipoVehiculo": idTipoVehiculo
            };

            if (dato.nombre == '') {
                alert('Falta completar el nombre')
            } else if (dato.costo < 0) {
                alert('El costo no puede ser menor a 0')
            } else {
                alert('Servicio agregado exitosamente')
                await fetch(`http://localhost:3000/api/servicios`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(dato),
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log("Respuesta:", data);
                    })
                    .catch((error) => {
                        console.error("Error:", error);
                    });
                tablaContainer.innerHTML = ""
                mostrarServicios();
            }
        }
    })
}
