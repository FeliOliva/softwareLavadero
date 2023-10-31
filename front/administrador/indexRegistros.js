async function mostrarRegistros() {
  divBuscar.style.display = "block";
  openModalBtn.style.display = "none";
  openServicModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "none";
  tablaContainer.innerHTML = "";
  tituloContainer.textContent = "Registro";
  parrafoContainer.textContent = "Estos son tus registros";
  labelBuscar.textContent = "Buscar por id";
  openModalRegistroBtn.style.display = "block";
  ordenar.style.display = "block";
  let inputParametro = document.getElementById("parametro");
  inputParametro.type = "number";

  await fetch("http://localhost:3000/api/registros/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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

      let horaHeader = document.createElement("th");
      horaHeader.textContent = "Hora";
      encabezado.appendChild(horaHeader);

      let fechaHeader = document.createElement("th");
      fechaHeader.textContent = "Fecha";
      encabezado.appendChild(fechaHeader);

      let clienteHeader = document.createElement("th");
      clienteHeader.textContent = "Cliente";
      encabezado.appendChild(clienteHeader);

      let vehiculoHeader = document.createElement("th");
      vehiculoHeader.textContent = "Vehiculo";
      encabezado.appendChild(vehiculoHeader);

      let servicioHeader = document.createElement("th");
      servicioHeader.textContent = "Servicio";
      encabezado.appendChild(servicioHeader);

      let estadoHeader = document.createElement("th");
      estadoHeader.textContent = "Estado";
      encabezado.appendChild(estadoHeader);

      let accionesHeader = document.createElement("th");
      accionesHeader.textContent = "Acciones";
      encabezado.appendChild(accionesHeader);

      thead.appendChild(encabezado);

      /* Registros */
      for (let i = 0; i < data.length; i++) {
        let valores = data[i];

        let fila = document.createElement("tr");

        let idCell = document.createElement("td");
        idCell.textContent = valores.id;
        fila.appendChild(idCell);

        let horaCell = document.createElement("td");
        horaCell.textContent = valores.hora;
        fila.appendChild(horaCell);

        let fechaCell = document.createElement("td");
        fechaCell.textContent = valores.fecha;
        fila.appendChild(fechaCell);

        let clienteCell = document.createElement("td");
        clienteCell.textContent = valores.idCliente;
        fila.appendChild(clienteCell);

        let vehiculoCell = document.createElement("td");
        vehiculoCell.textContent = valores.idVehiculo;
        fila.appendChild(vehiculoCell);

        let servicioCell = document.createElement("td");
        servicioCell.textContent = valores.idServicio;
        fila.appendChild(servicioCell);

        let estadoCell = document.createElement("td");
        estadoCell.textContent = valores.estado;
        fila.appendChild(estadoCell);

        let actualizarBtn = document.createElement("button");
        actualizarBtn.textContent = "Actualizar";
        actualizarBtn.setAttribute("data-valores-id", valores.id);

        if (valores.estado === "eliminado" || !esAdmin) {
          actualizarBtn.disabled = true;
        }
        actualizarBtn.addEventListener("click", function () {
          tituloModalRegistro.innerHTML = "Actualizar registro";
          modalRegistro.style.display = "block";
          btnEnviarRegistro.onclick = actualizarRegistro;
          btnEnviarRegistro.innerHTML = "Actualizar";
        });

        fila.appendChild(actualizarBtn);

        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", function () {
          if (valores.estado !== "eliminado") {
            const confirmar = confirm(
              "¿Estás seguro de que deseas eliminar este registro?"
            );
            if (confirmar) {
              eliminarRegistro(valores.id);
            }
          }
        });
        fila.appendChild(eliminarBtn);
        let upBtn = document.createElement("button");
        upBtn.textContent = "Activar";
        upBtn.setAttribute("data-valores-id", valores.id);

        upBtn.addEventListener("click", function () {
          if (valores.estado === "eliminado") {
            const confirmar = confirm(
              "¿Estás seguro de que deseas activar este registro?"
            );
            if (confirmar) {
              upRegistro(valores.id);
            }
          }
        });
        if (valores.estado === "eliminado" || !esAdmin) {
          eliminarBtn.disabled = true;
          upBtn.disabled = false;
          if (!esAdmin) {
            upBtn.disabled = true;
          }
        } else {
          eliminarBtn.disabled = false;
          upBtn.disabled = true;
          if (!esAdmin) {
            upBtn.disabled = false;
          }
        }
        fila.appendChild(upBtn);
        tbody.appendChild(fila);
      }

      tabla.appendChild(thead);
      tabla.appendChild(tbody);
      tablaContainer.appendChild(tabla);
    });
  const selectCliente = document.getElementById("clienteRegistro");
  fetch("http://localhost:3000/api/clientes")
    .then((response) => response.json())
    .then((data) => {
      selectCliente.innerHTML = "";
      data.forEach((cliente) => {
        if (cliente.estado != "eliminado") {
          const option = document.createElement("option");
          option.value = cliente.id;
          option.text = cliente.nombre + " " + cliente.apellido;
          selectCliente.appendChild(option);
        }
      });
    })
    .catch((error) =>
      console.error("Error al obtener los tipos de clientes:", error)
    );
  const selectVehiculos = document.getElementById("vehiculoRegistro");
  fetch("http://localhost:3000/api/vehiculos")
    .then((response) => response.json())
    .then((data) => {
      selectVehiculos.innerHTML = "";
      data.forEach((vehiculo) => {
        if (vehiculo.estado != "eliminado") {
          const option = document.createElement("option");
          option.value = vehiculo.id;
          option.text = vehiculo.patente;
          selectVehiculos.appendChild(option);
        }
      });
    })
    .catch((error) => console.error("Error al obtener los vehiculos:", error));
  const selectServicios = document.getElementById("servicioRegistro");
  fetch("http://localhost:3000/api/servicios")
    .then((response) => response.json())
    .then((data) => {
      selectServicios.innerHTML = "";
      data.forEach((servicio) => {
        if (servicio.estado != "eliminado") {
          const option = document.createElement("option");
          option.value = servicio.id;
          option.text = servicio.nombre;
          selectServicios.appendChild(option);
        }
      });
    })
    .catch((error) => console.error("Error al obtener los servicios:", error));
  openModalRegistroBtn.addEventListener("click", () => {
    btnEnviarRegistro.onclick = guardarRegistros;
    tituloModalRegistro.innerHTML = "Agregar registro";
    btnEnviarRegistro.innerHTML = "Guardar";
    async function guardarRegistros() {
      const hora = document.getElementById("horaRegistro").value;
      const fecha = document.getElementById("fechaRegistro").value;

      if (hora.trim() === "" || fecha.trim() === "") {
        alert("Falta completar datos en la hora y/o fecha.");
      } else {
        const dato = {
          hora: hora,
          fecha: fecha,
          idCliente: parseInt(document.getElementById("clienteRegistro").value),
          idVehiculo: parseInt(
            document.getElementById("vehiculoRegistro").value
          ),
          idServicio: parseInt(
            document.getElementById("servicioRegistro").value
          ),
        };

        alert("Registro agregado exitosamente");

        try {
          const response = await fetch("http://localhost:3000/api/registros", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dato),
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Respuesta:", data);
            mostrarRegistros();
          } else {
            console.error("Error al guardar el registro.");
          }
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  });
  ordenar.onclick = ordenarxEstadoRegistros;
  btnBuscar.onclick = filterByRegistro;
  function filterByRegistro(id) {
    let inputParametro = document.getElementById("parametro");
    let valorinputParametro = parseInt(inputParametro.value);

    if (isNaN(valorinputParametro) || inputParametro.value.trim() === "") {
      alert("Ingresa un número válido en el campo de búsqueda.");
      return;
    }
    let url = `http://localhost:3000/api/registros/filterBy/${valorinputParametro}`;
    console.log(valorinputParametro);

    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error en la solicitud de búsqueda");
        }
      })
      .then((data) => {
        console.log(data);
        actualizarTablaRegistros(data);
      })
      .catch((error) => {
        console.error("Error en la búsqueda de registros:", error);
      });
  }
}
function actualizarTablaRegistros(datos) {
  let tabla = document.getElementById("miTabla");
  let tbody = tabla.getElementsByTagName("tbody")[0];

  // Elimina todas las filas existentes en el tbody.
  while (tbody.rows.length > 0) {
    tbody.deleteRow(0);
  }
  datos.forEach((valores) => {
    console.log(valores);
    let fila = tbody.insertRow(-1);

    let idCell = fila.insertCell(0);
    idCell.textContent = valores.id;

    let horaCell = fila.insertCell(1);
    horaCell.textContent = valores.hora;

    let fechaCell = fila.insertCell(2);
    fechaCell.textContent = valores.fecha;

    let clienteCell = fila.insertCell(3);
    clienteCell.textContent = valores.idCliente;

    let vehiculoCell = fila.insertCell(4);
    vehiculoCell.textContent = valores.idVehiculo;

    let servicioCell = fila.insertCell(5);
    servicioCell.textContent = valores.idServicio;

    let estadoCell = fila.insertCell(6);
    estadoCell.textContent = valores.estado;
    // Agregar botones
    let accionesCell = fila.insertCell(7);

    let actualizarBtn = document.createElement("button");
    actualizarBtn.textContent = "Actualizar";
    actualizarBtn.addEventListener("click", function () {
      tituloModalRegistro.innerHTML = "Actualizar registros";
      modalRegistro.style.display = "block";
      btnEnviarRegistro.onclick = function () {
        actualizarRegistro(valores.id);
      };
      btnEnviarRegistro.innerHTML = "Actualizar";
    });
    accionesCell.appendChild(actualizarBtn);

    let eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.addEventListener("click", function () {
      if (valores.estado !== "eliminado") {
        const confirmar = confirm(
          "¿Estás seguro de que deseas eliminar estos registros?"
        );
        if (confirmar) {
          eliminarRegistro(valores.id);
        }
      }
    });
    accionesCell.appendChild(eliminarBtn);

    let upBtn = document.createElement("button");
    upBtn.textContent = "Activar";
    upBtn.addEventListener("click", function () {
      if (valores.estado === "eliminado") {
        const confirmar = confirm(
          "¿Estás seguro de que deseas activar estos registros?"
        );
        if (confirmar) {
          upRegistro(valores.id);
        }
      }
    });

    if (valores.estado === "eliminado" || !esAdmin) {
      actualizarBtn.disabled = true;
      eliminarBtn.disabled = true;
      upBtn.disabled = !esAdmin;
    } else {
      eliminarBtn.disabled = !esAdmin;
      upBtn.disabled = true;
    }
    accionesCell.appendChild(upBtn);
  });
}

async function actualizarRegistro() {
  const dato = {
    hora: document.getElementById("horaRegistro").value,
    fecha: document.getElementById("fechaRegistro").value,
    idCliente: document.getElementById("clienteRegistro").value,
    idVehiculo: document.getElementById("vehiculoRegistro").value,
    idServicio: document.getElementById("servicioRegistro").value,
    id: valores.id,
  };
  console.log(dato);
  if (dato.hora == null || dato.fecha == null) {
    alert("falta completar datos");
  } else {
    alert("Registro actualizado correctamente");
    await fetch(`http://localhost:3000/api/registros/`, {
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
    mostrarRegistros();
  }
}
function upRegistro(id) {
  fetch(`http://localhost:3000/api/registros/up/${id}`, {
    method: "PUT",
  })
    .then((response) => {
      if (response.status === 204) {
        console.log("Registro activado exitosamente");
        mostrarRegistros();
      } else {
        console.log("Error al activar el registro.");
      }
    })
    .catch((error) => {
      console.error("Error al activar el registro:", error);
    });
}
function eliminarRegistro(id) {
  fetch(`http://localhost:3000/api/registros/drop/${id}`, {
    method: "PUT",
  })
    .then((response) => {
      if (response.status === 204 || response.status === 200) {
        console.log("Registro eliminado exitosamente");
        mostrarRegistros();
      } else {
        console.log("Error al eliminar el registro.");
      }
    })
    .catch((error) => {
      console.error("Error al eliminar el registro:", error);
    });
}

async function ordenarxEstadoRegistros() {
  divBuscar.style.display = "block";
  openModalBtn.style.display = "none";
  openServicModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "none";
  tablaContainer.innerHTML = "";
  tituloContainer.textContent = "Registro";
  parrafoContainer.textContent = "Estos son tus registros";
  labelBuscar.textContent = "Buscar por id";
  openModalRegistroBtn.style.display = "block";
  ordenar.style.display = "block";

  await fetch("http://localhost:3000/api/registros/")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
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

      let horaHeader = document.createElement("th");
      horaHeader.textContent = "Hora";
      encabezado.appendChild(horaHeader);

      let fechaHeader = document.createElement("th");
      fechaHeader.textContent = "Fecha";
      encabezado.appendChild(fechaHeader);

      let clienteHeader = document.createElement("th");
      clienteHeader.textContent = "Cliente";
      encabezado.appendChild(clienteHeader);

      let vehiculoHeader = document.createElement("th");
      vehiculoHeader.textContent = "Vehiculo";
      encabezado.appendChild(vehiculoHeader);

      let servicioHeader = document.createElement("th");
      servicioHeader.textContent = "Servicio";
      encabezado.appendChild(servicioHeader);

      let estadoHeader = document.createElement("th");
      estadoHeader.textContent = "Estado";
      encabezado.appendChild(estadoHeader);

      let accionesHeader = document.createElement("th");
      accionesHeader.textContent = "Acciones";
      encabezado.appendChild(accionesHeader);

      thead.appendChild(encabezado);

      /* Registros */
      for (let i = 0; i < data.length; i++) {
        let valores = data[i];

        let fila = document.createElement("tr");

        let idCell = document.createElement("td");
        idCell.textContent = valores.id;
        fila.appendChild(idCell);

        let horaCell = document.createElement("td");
        horaCell.textContent = valores.hora;
        fila.appendChild(horaCell);

        let fechaCell = document.createElement("td");
        fechaCell.textContent = valores.fecha;
        fila.appendChild(fechaCell);

        let clienteCell = document.createElement("td");
        clienteCell.textContent = valores.idCliente;
        fila.appendChild(clienteCell);

        let vehiculoCell = document.createElement("td");
        vehiculoCell.textContent = valores.idVehiculo;
        fila.appendChild(vehiculoCell);

        let servicioCell = document.createElement("td");
        servicioCell.textContent = valores.idServicio;
        fila.appendChild(servicioCell);

        let estadoCell = document.createElement("td");
        estadoCell.textContent = valores.estado;
        fila.appendChild(estadoCell);

        let actualizarBtn = document.createElement("button");
        actualizarBtn.textContent = "Actualizar";
        actualizarBtn.setAttribute("data-valores-id", valores.id);

        if (valores.estado === "eliminado" || !esAdmin) {
          actualizarBtn.disabled = true;
        }

        actualizarBtn.addEventListener("click", function () {
          tituloModalRegistro.innerHTML = "Actualizar registro";
          modalRegistro.style.display = "block";
          btnEnviarRegistro.onclick = actualizarRegistro;
          btnEnviarRegistro.innerHTML = "Actualizar";
        });

        fila.appendChild(actualizarBtn);

        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", function () {
          if (valores.estado !== "eliminado") {
            const confirmar = confirm(
              "¿Estás seguro de que deseas eliminar este registro?"
            );
            if (confirmar) {
              eliminarRegistro(valores.id);
            }
          }
        });

        fila.appendChild(eliminarBtn);
        let upBtn = document.createElement("button");
        upBtn.textContent = "Activar";
        upBtn.setAttribute("data-valores-id", valores.id);

        upBtn.addEventListener("click", function () {
          if (valores.estado === "eliminado") {
            const confirmar = confirm(
              "¿Estás seguro de que deseas activar este registro?"
            );
            if (confirmar) {
              upRegistro(valores.id);
            }
          }
        });

        if (valores.estado === "eliminado" || !esAdmin) {
          eliminarBtn.disabled = true;
          upBtn.disabled = false;
          if (!esAdmin) {
            upBtn.disabled = true;
          }
        } else {
          eliminarBtn.disabled = false;
          upBtn.disabled = true;
          if (!esAdmin) {
            upBtn.disabled = false;
          }
        }

        fila.appendChild(upBtn);
        tbody.appendChild(fila);
      }

      tabla.appendChild(thead);
      tabla.appendChild(tbody);
      tablaContainer.appendChild(tabla);
    });

  const selectCliente = document.getElementById("clienteRegistro");
  fetch("http://localhost:3000/api/clientes")
    .then((response) => response.json())
    .then((data) => {
      selectCliente.innerHTML = "";
      data.forEach((cliente) => {
        if (cliente.estado != "eliminado") {
          const option = document.createElement("option");
          option.value = cliente.id;
          option.text = cliente.nombre + " " + cliente.apellido;
          selectCliente.appendChild(option);
        }
      });
    })
    .catch((error) =>
      console.error("Error al obtener los tipos de clientes:", error)
    );

  const selectVehiculos = document.getElementById("vehiculoRegistro");
  fetch("http://localhost:3000/api/vehiculos")
    .then((response) => response.json())
    .then((data) => {
      selectVehiculos.innerHTML = "";
      data.forEach((vehiculo) => {
        if (vehiculo.estado != "eliminado") {
          const option = document.createElement("option");
          option.value = vehiculo.id;
          option.text = vehiculo.patente;
          selectVehiculos.appendChild(option);
        }
      });
    })
    .catch((error) => console.error("Error al obtener los vehiculos:", error));

  const selectServicios = document.getElementById("servicioRegistro");
  fetch("http://localhost:3000/api/servicios")
    .then((response) => response.json())
    .then((data) => {
      selectServicios.innerHTML = "";
      data.forEach((servicio) => {
        if (servicio.estado != "eliminado") {
          const option = document.createElement("option");
          option.value = servicio.id;
          option.text = servicio.nombre;
          selectServicios.appendChild(option);
        }
      });
    })
    .catch((error) => console.error("Error al obtener los servicios:", error));

  openModalRegistroBtn.addEventListener("click", () => {
    btnEnviarRegistro.onclick = guardarRegistros;
    tituloModalRegistro.innerHTML = "Agregar registro";
    btnEnviarRegistro.innerHTML = "Guardar";
  });

  async function guardarRegistros() {
    const dato = {
      hora: document.getElementById("horaRegistro").value,
      fecha: document.getElementById("fechaRegistro").value,
      idCliente: parseInt(document.getElementById("clienteRegistro").value),
      idVehiculo: parseInt(document.getElementById("vehiculoRegistro").value),
      idServicio: parseInt(document.getElementById("servicioRegistro").value),
    };

    if (dato.hora == "" || dato.fecha == "") {
      alert("Falta completar datos");
      return;
    } else {
      alert("Registro agregado exitosamente");
      await fetch(`http://localhost:3000/api/registros`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dato),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Respuesta:", data);
          mostrarRegistros();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}
