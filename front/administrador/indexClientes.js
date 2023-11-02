async function mostrarClientes() {
  divBuscar.style.display = "block";
  openModalBtn.style.display = "none";
  openServicModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "block";
  openModalRegistroBtn.style.display = "none";
  tablaContainer.innerHTML = "";
  tituloContainer.textContent = "Clientes";
  parrafoContainer.textContent = "Estos son tus clientes";
  labelBuscar.textContent = "Buscar por nombre o apellido";
  ordenar.style.display = "block";
  let inputParametro = document.getElementById("parametro");
  inputParametro.type = "text";
  await fetch("http://localhost:3000/api/clientes/")
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

        let actualizarBtn = document.createElement("button");
        actualizarBtn.textContent = "Actualizar";
        actualizarBtn.setAttribute("data-registro-id", registro.id);

        if (registro.estado === "eliminado" || !esAdmin) {
          actualizarBtn.disabled = true;
        }
        actualizarBtn.addEventListener("click", function () {
          if (registro.id) {
            tituloModalCliente.innerHTML = "Actualizar Cliente";
            modalCliente.style.display = "block";
            btnEnviarCliente.onclick = function () {
              actualizarCliente(registro.id);
            };
            btnEnviarCliente.innerHTML = "Actualizar";
          } else {
            alert("No se puede actualizar el cliente sin un ID válido.");
          }
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
              eliminarCliente(registro.id);
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
              upCliente(registro.id);
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
  openClienteModalBtn.addEventListener("click", () => {
    btnEnviarCliente.onclick = guardarClientes;
    tituloModalCliente.innerHTML = "Agregar cliente";
    btnEnviarCliente.innerHTML = "Guardar";
    async function guardarClientes() {
      let localidad = document.getElementById("localidad").value;
      let idlocalidad;
      console.log(localidad);

      if (localidad === "villaMaria") {
        idlocalidad = 1;
      } else if (localidad === "villaNueva") {
        idlocalidad = 2;
      } else {
        idlocalidad = 3;
      }
      console.log(idlocalidad);

      const dato = {
        nombre: document.getElementById("nombreCliente").value,
        apellido: document.getElementById("apellido").value,
        idLocalidad: idlocalidad,
      };

      if (dato.nombre == "" || dato.apellido == "") {
        alert("falta completar datoss");
      } else {
        alert("Cliente agregado exitosamente");
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
            mostrarClientes();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  });
  ordenar.onclick = ordenarxEstadoCliente;
  btnBuscar.onclick = fitlerByClientes;
  function fitlerByClientes() {
    let inputParametro = document.getElementById("parametro").value;
    let url = `http://localhost:3000/api/clientes/filterBy/nombre?nombre=${inputParametro}`;

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
        actualizarTablaClientes(data);
      })
      .catch((error) => {
        console.error("Error en la búsqueda de clientes:", error);
      });
  }
}
function actualizarTablaClientes(datos) {
  let tabla = document.getElementById("miTabla");
  let tbody = tabla.getElementsByTagName("tbody")[0];
  // Elimina todas las filas existentes en el tbody.
  while (tbody.rows.length > 0) {
    tbody.deleteRow(0);
  }
  console.log(datos);
  datos.forEach((registro) => {
    let idlocalidad = registro.idLocalidad;
    let localidad;
    if (idlocalidad === 1) {
      localidad = "Villa Maria";
    } else if (idlocalidad === 2) {
      localidad = "Villa Nueva";
    } else {
      localidad = "Tio Pujio";
    }
    let fila = tbody.insertRow(-1);

    let idCell = fila.insertCell(0);
    idCell.textContent = registro.id;

    let patenteCell = fila.insertCell(1);
    patenteCell.textContent = registro.nombre;

    let tipoVehiculoCell = fila.insertCell(2);
    tipoVehiculoCell.textContent = registro.apellido;

    let modeloCell = fila.insertCell(3);
    modeloCell.textContent = localidad;

    let clienteCell = fila.insertCell(4);
    clienteCell.textContent = registro.estado;

    // Agregar botones
    let accionesCell = fila.insertCell(5);

    let actualizarBtn = document.createElement("button");
    actualizarBtn.textContent = "Actualizar";
    actualizarBtn.addEventListener("click", function () {
      if (registro.id) {
        tituloModalCliente.innerHTML = "Actualizar Cliente";
        modalCliente.style.display = "block";
        btnEnviarCliente.onclick = function () {
          actualizarCliente(registro.id);
        };
        btnEnviarCliente.innerHTML = "Actualizar";
      } else {
        alert("No se puede actualizar el cliente sin un ID válido.");
      }
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
          eliminarCliente(registro.id);
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
          upCliente(registro.id);
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

async function actualizarCliente(id) {
  let localidad = document.getElementById("localidad").value;
  let idlocalidad;
  if (localidad === "villaMaria") {
    idlocalidad = 1;
  } else if (localidad === "villaNueva") {
    idlocalidad = 2;
  } else {
    idlocalidad = 3;
  }
  const dato = {
    nombre: document.getElementById("nombreCliente").value,
    apellido: document.getElementById("apellido").value,
    idLocalidad: idlocalidad,
    id: id,
  };
  console.log(dato);
  if (dato.nombre == "") {
    alert("falta completar el nombre");
  } else {
    alert("Cliente actualizado correctamente");
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
    mostrarClientes();
  }
}
function upCliente(id) {
  fetch(`http://localhost:3000/api/clientes/up/${id}`, {
    method: "PUT",
  })
    .then((response) => {
      if (response.status === 204) {
        console.log("Registro activado exitosamente");
        mostrarClientes();
      } else {
        console.log("Error al activar el registro.");
      }
    })
    .catch((error) => {
      console.error("Error al activar el registro:", error);
    });
}
function eliminarCliente(id) {
  fetch(`http://localhost:3000/api/clientes/drop/${id}`, {
    method: "PUT",
  })
    .then((response) => {
      if (response.status === 204 || response.status === 200) {
        console.log("Registro eliminado exitosamente");
        mostrarClientes();
      } else {
        console.log("Error al eliminar el registro.");
      }
    })
    .catch((error) => {
      console.error("Error al eliminar el registro:", error);
    });
}
async function ordenarxEstadoCliente() {
  divBuscar.style.display = "block";
  openModalBtn.style.display = "none";
  openServicModalBtn.style.display = "none";
  openClienteModalBtn.style.display = "block";
  tablaContainer.innerHTML = "";
  tituloContainer.textContent = "Clientes";
  parrafoContainer.textContent = "Estos son tus clientes";
  labelBuscar.textContent = "Buscar por nombre o apellido";
  ordenar.style.display = "block";
  await fetch("http://localhost:3000/api/clientes/orderByEstado")
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

        let actualizarBtn = document.createElement("button");
        actualizarBtn.textContent = "Actualizar";
        actualizarBtn.setAttribute("data-registro-id", registro.id);

        if (registro.estado === "eliminado" || !esAdmin) {
          actualizarBtn.disabled = true;
        }
        actualizarBtn.addEventListener("click", function () {
          if (registro.id) {
            tituloModalCliente.innerHTML = "Actualizar Cliente";
            modalCliente.style.display = "block";
            btnEnviarCliente.onclick = function () {
              actualizarCliente(registro.id);
            };
            btnEnviarCliente.innerHTML = "Actualizar";
          } else {
            alert("No se puede actualizar el cliente sin un ID válido.");
          }
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
              eliminarCliente(registro.id);
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
              upCliente(registro.id);
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
  openClienteModalBtn.addEventListener("click", () => {
    btnEnviarCliente.onclick = guardarClientes;
    tituloModalCliente.innerHTML = "Agregar cliente";
    btnEnviarCliente.innerHTML = "Guardar";
    async function guardarClientes() {
      let localidad = document.getElementById("localidad").value;
      let idlocalidad;
      console.log(localidad);

      if (localidad === "villaMaria") {
        idlocalidad = 1;
      } else if (localidad === "villaNueva") {
        idlocalidad = 2;
      } else {
        idlocalidad = 3;
      }
      console.log(idlocalidad);

      const dato = {
        nombre: document.getElementById("nombreCliente").value,
        apellido: document.getElementById("apellido").value,
        idLocalidad: idlocalidad,
      };

      if (dato.nombre == "" || dato.apellido == "") {
        alert("falta completar datos");
      } else {
        alert("Cliente agregado exitosamente");
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
            mostrarClientes();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    }
  });
}
