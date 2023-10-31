async function mostrarVehiculos() {
  divBuscar.style.display = "block";
  openModalBtn.style.display = "block";
  openServicModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "none";
  tablaContainer.innerHTML = "";
  tituloContainer.textContent = "Vehiculos";
  parrafoContainer.textContent = "Estos son tus vehiculos";
  labelBuscar.textContent = "Buscar por patente";
  ordenar.style.display = "block";
  fetch("http://localhost:3000/api/vehiculos/")
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

        let actualizarBtn = document.createElement("button");
        actualizarBtn.textContent = "Actualizar";
        actualizarBtn.setAttribute("data-registro-id", registro.id);

        if (registro.estado === "eliminado" || !esAdmin) {
          actualizarBtn.disabled = true;
        }
        actualizarBtn.addEventListener("click", function () {
          tituloModal.innerHTML = "Actualizar Vehiculo";
          modal.style.display = "block";
          btnEnviar.onclick = actualizarVehiculo;
          btnEnviar.innerHTML = "actualizar";
        });

        fila.appendChild(actualizarBtn);

        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", function () {
          if (registro.estado !== "eliminado") {
            const confirmar = confirm(
              "¿Estás seguro de que deseas eliminar este registro?"
            );
            if (confirmar) {
              eliminarVehiculo(registro.id);
            }
          }
        });

        fila.appendChild(eliminarBtn);

        let upBtn = document.createElement("button");
        upBtn.textContent = "Activar";
        upBtn.setAttribute("data-registro-id", registro.id);

        upBtn.addEventListener("click", function () {
          if (registro.estado === "eliminado") {
            const confirmar = confirm(
              "¿Estás seguro de que deseas activar este registro?"
            );
            if (confirmar) {
              upVehiculo(registro.id);
            }
          }
        });
        if (registro.estado === "eliminado" || !esAdmin) {
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
  const selectModelo = document.getElementById("tipoModelo");
  fetch("http://localhost:3000/api/modelos")
    .then((response) => response.json())
    .then((data) => {
      selectModelo.innerHTML = "";

      data.forEach((modelo) => {
        const option = document.createElement("option");
        option.value = modelo.id;
        option.text = modelo.nombre;
        selectModelo.appendChild(option);
      });
    })
    .catch((error) =>
      console.error("Error al obtener los tipos de vehículo:", error)
    );

  const selectCliente = document.getElementById("tipoCliente");
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
      console.error("Error al obtener los tipos de vehículo:", error)
    );
  openModalBtn.addEventListener("click", () => {
    btnEnviar.onclick = guardarVehiculos;
    tituloModal.innerHTML = "Agregar Vehiculo";
    btnEnviar.innerHTML = "Guardar";
    async function guardarVehiculos() {
      let tipoVehiculos = document.getElementById("tipoVehiculos").value;
      let idTipoVehiculo;

      if (tipoVehiculos === "auto") {
        idTipoVehiculo = 1;
      } else {
        idTipoVehiculo = 2;
      }

      const dato = {
        patente: document.getElementById("patente").value,
        idTipoVehiculo: idTipoVehiculo,
        idModelo: parseInt(document.getElementById("tipoModelo").value),
        idCliente: parseInt(document.getElementById("tipoCliente").value),
      };

      if (dato.patente == "") {
        alert("falta completar la patente");
      } else {
        alert("vehiculo agregado exitosamente");
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
            mostrarVehiculos();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  });
  ordenar.onclick = ordenarxEstado;
  btnBuscar.onclick = fitlerByVehiculos;
  function fitlerByVehiculos() {
    let inputParametro = document.getElementById("parametro").value;
    let url = `http://localhost:3000/api/vehiculos/filterBy/patente?patente=${inputParametro}`;

    console.log(inputParametro);
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Error en la solicitud de búsqueda");
        }
      })
      .then((data) => {
        actualizarTablaVehiculos(data);
      })
      .catch((error) => {
        console.error("Error en la búsqueda de vehiculos:", error);
      });
  }
}
function actualizarTablaVehiculos(datos) {
  let tabla = document.getElementById("miTabla");
  let tbody = tabla.getElementsByTagName("tbody")[0];

  // Elimina todas las filas existentes en el tbody.
  while (tbody.rows.length > 0) {
    tbody.deleteRow(0);
  }

  datos.forEach((registro) => {
    let fila = tbody.insertRow(-1);

    let idCell = fila.insertCell(0);
    idCell.textContent = registro.id;

    let patenteCell = fila.insertCell(1);
    patenteCell.textContent = registro.patente;

    let tipoVehiculoCell = fila.insertCell(2);
    tipoVehiculoCell.textContent = registro.tipo_vehiculo;

    let modeloCell = fila.insertCell(3);
    modeloCell.textContent = registro.modelo_nombre;

    let clienteCell = fila.insertCell(4);
    clienteCell.textContent = registro.cliente_nombre;

    let estadoCell = fila.insertCell(5);
    estadoCell.textContent = registro.estado;

    // Agregar botones
    let accionesCell = fila.insertCell(6);

    let actualizarBtn = document.createElement("button");
    actualizarBtn.textContent = "Actualizar";
    actualizarBtn.addEventListener("click", function () {
      tituloModal.innerHTML = "Actualizar Vehiculo";
      modal.style.display = "block";
      btnEnviar.onclick = function () {
        actualizarVehiculo(registro.id);
      };
      btnEnviar.innerHTML = "Actualizar";
    });
    accionesCell.appendChild(actualizarBtn);

    let eliminarBtn = document.createElement("button");
    eliminarBtn.textContent = "Eliminar";
    eliminarBtn.addEventListener("click", function () {
      if (registro.estado !== "eliminado") {
        const confirmar = confirm(
          "¿Estás seguro de que deseas eliminar este registro?"
        );
        if (confirmar) {
          eliminarVehiculo(registro.id);
        }
      }
    });
    accionesCell.appendChild(eliminarBtn);

    let upBtn = document.createElement("button");
    upBtn.textContent = "Activar";
    upBtn.addEventListener("click", function () {
      if (registro.estado === "eliminado") {
        const confirmar = confirm(
          "¿Estás seguro de que deseas activar este registro?"
        );
        if (confirmar) {
          upVehiculo(registro.id);
        }
      }
    });

    if (registro.estado === "eliminado" || !esAdmin) {
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

function upVehiculo(id) {
  fetch(`http://localhost:3000/api/vehiculos/up/${id}`, {
    method: "PUT",
  })
    .then((response) => {
      if (response.status === 204) {
        console.log("Registro activado exitosamente");
        mostrarVehiculos();
      } else {
        console.log("Error al activar el registro.");
      }
    })
    .catch((error) => {
      console.error("Error al activar el registro:", error);
    });
}

function eliminarVehiculo(id) {
  fetch(`http://localhost:3000/api/vehiculos/drop/${id}`, {
    method: "PUT",
  })
    .then((response) => {
      if (response.status === 204) {
        console.log("registro eliminado exitosamente");
        mostrarVehiculos();
      } else {
        console.log("Error al eliminar el registro.");
      }
    })
    .catch((error) => {
      console.error("Error al eliminar el registro:", error);
    });
}

async function actualizarVehiculo(id) {
  let tipoVehiculos = document.getElementById("tipoVehiculos").value;
  let idTipoVehiculo;
  if (tipoVehiculos === "auto") {
    idTipoVehiculo = 1;
  } else {
    idTipoVehiculo = 2;
  }
  const dato = {
    patente: document.getElementById("patente").value,
    idCliente: parseInt(document.getElementById("tipoCliente").value),
    idTipoVehiculo: idTipoVehiculo,
    idModelo: parseInt(document.getElementById("tipoModelo").value),
    id: registro.id,
  };
  console.log(dato);
  if (dato.patente == "") {
    alert("falta completar la patente");
  } else {
    alert("vehiculo actualizado correctamente");
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
        mostrarVehiculos();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  tablaContainer.innerHTML = "";
}
async function ordenarxEstado() {
  divBuscar.style.display = "block";
  openModalBtn.style.display = "block";
  openServicModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "none";
  tablaContainer.innerHTML = "";
  tituloContainer.textContent = "Vehiculos";
  parrafoContainer.textContent = "Estos son tus vehiculos";
  labelBuscar.textContent = "Buscar por patente";
  ordenar.style.display = "block";
  fetch("http://localhost:3000/api/vehiculos/orderByEstado")
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

        let actualizarBtn = document.createElement("button");
        actualizarBtn.textContent = "Actualizar";
        actualizarBtn.setAttribute("data-registro-id", registro.id);

        if (registro.estado === "eliminado" || !esAdmin) {
          actualizarBtn.disabled = true;
        }
        actualizarBtn.addEventListener("click", function () {
          tituloModal.innerHTML = "Actualizar Vehiculo";
          modal.style.display = "block";
          btnEnviar.onclick = actualizarVehiculo;
          btnEnviar.innerHTML = "actualizar";
        });

        fila.appendChild(actualizarBtn);

        let eliminarBtn = document.createElement("button");
        eliminarBtn.textContent = "Eliminar";
        eliminarBtn.addEventListener("click", function () {
          if (registro.estado !== "eliminado") {
            const confirmar = confirm(
              "¿Estás seguro de que deseas eliminar este registro?"
            );
            if (confirmar) {
              eliminarVehiculo(registro.id);
            }
          }
        });

        fila.appendChild(eliminarBtn);

        let upBtn = document.createElement("button");
        upBtn.textContent = "Activar";
        upBtn.setAttribute("data-registro-id", registro.id);

        upBtn.addEventListener("click", function () {
          if (registro.estado === "eliminado") {
            const confirmar = confirm(
              "¿Estás seguro de que deseas activar este registro?"
            );
            if (confirmar) {
              upVehiculo(registro.id);
            }
          }
        });
        if (registro.estado === "eliminado" || !esAdmin) {
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
  const selectModelo = document.getElementById("tipoModelo");
  fetch("http://localhost:3000/api/modelos")
    .then((response) => response.json())
    .then((data) => {
      selectModelo.innerHTML = "";

      data.forEach((modelo) => {
        const option = document.createElement("option");
        option.value = modelo.id;
        option.text = modelo.nombre;
        selectModelo.appendChild(option);
      });
    })
    .catch((error) =>
      console.error("Error al obtener los tipos de vehículo:", error)
    );

  const selectCliente = document.getElementById("tipoCliente");
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
      console.error("Error al obtener los tipos de vehículo:", error)
    );
  openModalBtn.addEventListener("click", () => {
    btnEnviar.onclick = guardarVehiculos;
    tituloModal.innerHTML = "Agregar Vehiculo";
    btnEnviar.innerHTML = "Guardar";
    async function guardarVehiculos() {
      let tipoVehiculos = document.getElementById("tipoVehiculos").value;
      let idTipoVehiculo;

      if (tipoVehiculos === "auto") {
        idTipoVehiculo = 1;
      } else {
        idTipoVehiculo = 2;
      }

      const dato = {
        patente: document.getElementById("patente").value,
        idTipoVehiculo: idTipoVehiculo,
        idModelo: parseInt(document.getElementById("tipoModelo").value),
        idCliente: parseInt(document.getElementById("tipoCliente").value),
      };

      if (dato.patente == "") {
        alert("falta completar la patente");
      } else {
        alert("vehiculo agregado exitosamente");
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
            mostrarVehiculos();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  });
}
