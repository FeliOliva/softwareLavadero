async function mostrarClientes() {
    openModalBtn.style.display = 'none'
    openServicModalBtn.style.display = 'none'
    openClienteModalBtn.style.display = 'block'
    tablaContainer.innerHTML = "";
    tituloContainer.textContent = "Clientes";
    parrafoContainer.textContent = "Estos son tus clientes"
    fetch('http://localhost:3000/api/clientes/')
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


            let apellidoHeader = document.createElement("th");
            apellidoHeader.textContent = "Apellido";
            encabezado.appendChild(apellidoHeader);

            let localidadHeader = document.createElement("th");
            localidadHeader.textContent = "Localidad";
            encabezado.appendChild(localidadHeader);

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


                let apellidoCell = document.createElement("td");
                apellidoCell.textContent = registro.apellido;
                fila.appendChild(apellidoCell);

                let localidadCell = document.createElement("td");
                localidadCell.textContent = registro.localidad;
                fila.appendChild(localidadCell);

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
                    tituloModalCliente.innerHTML = 'Actualizar Cliente'
                    modalCliente.style.display = 'block';
                    btnEnviarCliente.onclick = actualizarCliente;
                    btnEnviarCliente.innerHTML = 'Actualizar'
                    async function actualizarCliente() {
                        let localidad = document.getElementById('localidad').value;
                        let idlocalidad;
                        if (localidad === 'villaMaria') {
                            idlocalidad = 1
                        } else if (localidad === 'villaNueva') {
                            idlocalidad = 2
                        } else {
                            idlocalidad = 3
                        }
                        const dato = {
                            "nombre": document.getElementById('nombreCliente').value,
                            "apellido": document.getElementById('apellido').value,
                            "idLocalidad": idlocalidad,
                            "id": registro.id
                        };
                        console.log(dato)
                        if (dato.nombre == '') {
                            alert('falta completar el nombre')
                        } else {
                            alert('Cliente actualizado correctamente')
                            await fetch(`http://localhost:3000/api/clientes/`, {
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
                        mostrarClientes();
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
                            fetch(`http://localhost:3000/api/clientes/${registro.id}`, {
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
                        location.reload();
                    }
                    mostrarClientes();
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
    openClienteModalBtn.addEventListener('click', () => {
        btnEnviarCliente.onclick = guardarClientes;
        tituloModalCliente.innerHTML = 'Agregar cliente'
        btnEnviarCliente.innerHTML = 'Guardar'
        async function guardarClientes() {
            let localidad = document.getElementById('localidad').value;
            let idlocalidad;

            if (localidad === 'villaMaria') {
                idlocalidad = 1
            } else if (localidad === 'villaNueva') {
                idlocalidad = 2
            } {
                idlocalidad = 3
            }

            const dato = {
                "nombre": document.getElementById('nombreCliente').value,
                "apellido": document.getElementById('apellido').value,
                "idLocalidad": idlocalidad
            };

            if (dato.nombre == '' || dato.apellido == '') {
                alert('falta completar datoss')
            } else {
                alert('Cliente agregado exitosamente')
                await fetch(`http://localhost:3000/api/clientes`, {
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
                mostrarClientes();
            }
        }
    })

}