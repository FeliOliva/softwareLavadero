async function mostrarVehiculos() {
    openModalBtn.style.display = 'block'
    openServicModalBtn.style.display = 'none'
    openClienteModalBtn.style.display = 'none'
    tablaContainer.innerHTML = "";
    tituloContainer.textContent = "Vehiculos";
    parrafoContainer.textContent = "Estos son tus vehiculos"
    fetch('http://localhost:3000/api/vehiculos/')
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

            let patenteHeader = document.createElement("th");
            patenteHeader.textContent = "Patente";
            encabezado.appendChild(patenteHeader);

            let tipoVehiculoHeader = document.createElement("th");
            tipoVehiculoHeader.textContent = "Tipo de Vehículo";
            encabezado.appendChild(tipoVehiculoHeader);

            let modeloHeader = document.createElement("th");
            modeloHeader.textContent = "Modelo";
            encabezado.appendChild(modeloHeader);

            let clienteHeader = document.createElement("th");
            clienteHeader.textContent = "Cliente";
            encabezado.appendChild(clienteHeader);

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

                let patenteCell = document.createElement("td");
                patenteCell.textContent = registro.patente;
                fila.appendChild(patenteCell);

                let tipoVehiculoCell = document.createElement("td");
                tipoVehiculoCell.textContent = registro.tipo_vehiculo;
                fila.appendChild(tipoVehiculoCell);

                let modeloCell = document.createElement("td");
                modeloCell.textContent = registro.modelo_nombre;
                fila.appendChild(modeloCell);

                let clienteCell = document.createElement("td");
                clienteCell.textContent = registro.cliente_nombre;
                fila.appendChild(clienteCell);

                let estadoCell = document.createElement("td");
                estadoCell.textContent = registro.estado;
                fila.appendChild(estadoCell);


                let actualizarBtn = document.createElement('button');
                actualizarBtn.textContent = 'Actualizar';
                actualizarBtn.setAttribute('data-registro-id', registro.id);

                if (registro.estado === 'eliminado') {
                    actualizarBtn.disabled = true;
                }
                actualizarBtn.addEventListener('click', function () {
                    tituloModal.innerHTML = 'Actualizar Vehiculo'
                    modal.style.display = 'block';
                    btnEnviar.onclick = actualizarVehiculo;
                    btnEnviar.innerHTML = 'actualizar'
                    async function actualizarVehiculo() {
                        let tipoVehiculos = document.getElementById('tipoVehiculos').value;
                        let idTipoVehiculo;
                        if (tipoVehiculos === 'auto') {
                            idTipoVehiculo = 1;
                        } else {
                            idTipoVehiculo = 2;
                        }
                        const dato = {
                            "patente": document.getElementById('patente').value,
                            "idCliente": parseInt(document.getElementById('tipoCliente').value),
                            "idTipoVehiculo": idTipoVehiculo,
                            "idModelo": parseInt(document.getElementById('tipoModelo').value),
                            "id": registro.id
                        };
                        console.log(dato)
                        if (dato.patente == '') {
                            alert('falta completar la patente')
                        } else {
                            alert('vehiculo actualizado correctamente')
                            await fetch(`http://localhost:3000/api/vehiculos`, {
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
                        mostrarVehiculos();
                    }
                }
                );

                fila.appendChild(actualizarBtn);

                let eliminarBtn = document.createElement("button");
                eliminarBtn.textContent = "Eliminar";
                eliminarBtn.addEventListener('click', function () {
                    if (registro.estado !== 'eliminado') {
                        const confirmar = confirm("¿Estás seguro de que deseas eliminar este registro?");
                        if (confirmar) {
                            fetch(`http://localhost:3000/api/vehiculos/${registro.id}`, {
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
                        mostrarVehiculos();
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
    const selectModelo = document.getElementById('tipoModelo');
    fetch('http://localhost:3000/api/modelos')
        .then(response => response.json())
        .then(data => {
            selectModelo.innerHTML = '';

            data.forEach(modelo => {
                const option = document.createElement('option');
                option.value = modelo.id;
                option.text = modelo.nombre;
                selectModelo.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los tipos de vehículo:', error));

    const selectCliente = document.getElementById('tipoCliente');
    fetch('http://localhost:3000/api/clientes')
        .then(response => response.json())
        .then(data => {
            selectCliente.innerHTML = '';

            data.forEach(cliente => {
                const option = document.createElement('option');
                option.value = cliente.id;
                option.text = cliente.nombre;
                selectCliente.appendChild(option);
            });
        })
        .catch(error => console.error('Error al obtener los tipos de vehículo:', error));
    openModalBtn.addEventListener('click', () => {
        btnEnviar.onclick = guardarVehiculos;
        tituloModal.innerHTML = 'Agregar Vehiculo'
        btnEnviar.innerHTML = 'Guardar'
        async function guardarVehiculos() {
            let tipoVehiculos = document.getElementById('tipoVehiculos').value;
            let idTipoVehiculo;

            if (tipoVehiculos === 'auto') {
                idTipoVehiculo = 1;
            } else {
                idTipoVehiculo = 2;
            }

            const dato = {
                "patente": document.getElementById('patente').value,
                "idTipoVehiculo": idTipoVehiculo,
                "idModelo": parseInt(document.getElementById('tipoModelo').value),
                "idCliente": parseInt(document.getElementById('tipoCliente').value),
            };

            if (dato.patente == '') {
                alert('falta completar la patente')
            } else {
                alert('vehiculo agregado exitosamente')
                await fetch(`http://localhost:3000/api/vehiculos`, {
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
                mostrarVehiculos();
            }
        }
    })
}
