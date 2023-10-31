async function mostrarServicios() {
  divBuscar.style.display = "block";
  tablaContainer.innerHTML = "";
  openModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "none";
  openServicModalBtn.style.display = "block";
  tituloContainer.textContent = "Servicios";
  parrafoContainer.textContent = "Estos son los servicios";
  labelBuscar.textContent = "Buscar por nombre";
  ordenar.style.display = "block";
  fetch("http://localhost:3000/api/servicios/")
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
        fila.appendChild(estadoCell);

        let actualizarBtn = document.createElement("button");
        actualizarBtn.textContent = "Actualizar";
        actualizarBtn.setAttribute("data-registro-id", registro.id);

        if (registro.estado === "eliminado" || !esAdmin) {
          actualizarBtn.disabled = true;
        }

        actualizarBtn.addEventListener("click", function () {
          tituloModalServic.innerHTML = "Actualizar servicio";
          modalServicio.style.display = "block";
          btnEnviarServicio.onclick = actualizarServicio;
          btnEnviarServicio.innerHTML = "actualizar";
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
              eliminarServicio(registro.id);
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
              upServicio(registro.id);
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
  openServicModalBtn.addEventListener("click", () => {
    btnEnviarServicio.onclick = guardarServicios;
    tituloModalServic.innerHTML = "Agregar Servicio";
    btnEnviarServicio.innerHTML = "Guardar";
    async function guardarServicios() {
      let tipoVehiculos = document.getElementById("tipoVehiculos").value;
      let idTipoVehiculo;

      if (tipoVehiculos === "auto") {
        idTipoVehiculo = 1;
      } else {
        idTipoVehiculo = 2;
      }

      const dato = {
        nombre: document.getElementById("nombreServicio").value,
        costo: document.getElementById("costo").value,
        idTipoVehiculo: idTipoVehiculo,
      };

      if (dato.nombre == "") {
        alert("Falta completar el nombre");
      } else if (dato.costo < 0) {
        alert("El costo no puede ser menor a 0");
      } else {
        alert("Servicio agregado exitosamente");
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
            mostrarServicios();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  });
  ordenar.onclick = ordenarxEstadoServicios;
  btnBuscar.onclick = fitlerByServicio;
}
function fitlerByServicio() {
  let inputParametro = document.getElementById("parametro").value;
  let url = `http://localhost:3000/api/servicios/filterBy/nombre?nombre=${inputParametro}`;

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
      actualizarTablaServicios(data);
    })
    .catch((error) => {
      console.error("Error en la búsqueda de clientes:", error);
    });
}

function actualizarTablaServicios(datos) {
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
    patenteCell.textContent = registro.nombre;

    let tipoVehiculoCell = fila.insertCell(2);
    tipoVehiculoCell.textContent = registro.costo;

    let modeloCell = fila.insertCell(3);
    modeloCell.textContent = registro.tipo_vehiculo;

    let clienteCell = fila.insertCell(4);
    clienteCell.textContent = registro.estado;

    // Agregar botones
    let accionesCell = fila.insertCell(5);

    let actualizarBtn = document.createElement("button");
    actualizarBtn.textContent = "Actualizar";
    actualizarBtn.addEventListener("click", function () {
      tituloModalServic.innerHTML = "Actualizar Servicios";
      modalServicio.style.display = "block";
      btnEnviarServicio.onclick = function () {
        actualizarCliente(registro.id);
      };
      btnEnviarServicio.innerHTML = "Actualizar";
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
          eliminarServicio(registro.id);
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
          upServicio(registro.id);
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
function upServicio(id) {
  fetch(`http://localhost:3000/api/servicios/up/${id}`, {
    method: "PUT",
  })
    .then((response) => {
      if (response.status === 204) {
        console.log("Registro activado exitosamente");
        mostrarServicios();
      } else {
        console.log("Error al activar el registro.");
      }
    })
    .catch((error) => {
      console.error("Error al activar el registro:", error);
    });
}
function eliminarServicio(id) {
  fetch(`http://localhost:3000/api/servicios/drop/${id}`, {
    method: "PUT",
  })
    .then((response) => {
      if (response.status === 204 || response.status === 200) {
        console.log("Registro eliminado exitosamente");
        mostrarServicios();
      } else {
        console.log("Error al eliminar el registro.");
      }
    })
    .catch((error) => {
      console.error("Error al eliminar el registro:", error);
    });
}
async function ordenarxEstadoServicios() {
  divBuscar.style.display = "block";
  tablaContainer.innerHTML = "";
  openModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "none";
  openServicModalBtn.style.display = "block";
  tituloContainer.textContent = "Servicios";
  parrafoContainer.textContent = "Estos son los servicios";
  labelBuscar.textContent = "Buscar por nombre";
  ordenar.style.display = "block";
  fetch("http://localhost:3000/api/servicios/orderByEstado")
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
        fila.appendChild(estadoCell);

        let actualizarBtn = document.createElement("button");
        actualizarBtn.textContent = "Actualizar";
        actualizarBtn.setAttribute("data-registro-id", registro.id);

        if (registro.estado === "eliminado" || !esAdmin) {
          actualizarBtn.disabled = true;
        }

        actualizarBtn.addEventListener("click", function () {
          tituloModalServic.innerHTML = "Actualizar servicio";
          modalServicio.style.display = "block";
          btnEnviarServicio.onclick = actualizarServicio;
          btnEnviarServicio.innerHTML = "actualizar";
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
              eliminarServicio(registro.id);
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
              upServicio(registro.id);
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
  openServicModalBtn.addEventListener("click", () => {
    btnEnviarServicio.onclick = guardarServicios;
    tituloModalServic.innerHTML = "Agregar Servicio";
    btnEnviarServicio.innerHTML = "Guardar";
    async function guardarServicios() {
      let tipoVehiculos = document.getElementById("tipoVehiculos").value;
      let idTipoVehiculo;

      if (tipoVehiculos === "auto") {
        idTipoVehiculo = 1;
      } else {
        idTipoVehiculo = 2;
      }

      const dato = {
        nombre: document.getElementById("nombreServicio").value,
        costo: document.getElementById("costo").value,
        idTipoVehiculo: idTipoVehiculo,
      };

      if (dato.nombre == "") {
        alert("Falta completar el nombre");
      } else if (dato.costo < 0) {
        alert("El costo no puede ser menor a 0");
      } else {
        alert("Servicio agregado exitosamente");
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
            mostrarServicios();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  });
}
