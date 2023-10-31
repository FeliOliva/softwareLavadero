const usuarioInput = document.getElementById("usuario");
const passwordInput = document.getElementById("password");
let usuarioAdmin;
let usuarioOperario;
let esAdmin = false;

fetch("http://localhost:3000/api/users/")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((data) => {
    console.log(data);
    if (data.length > 1) {
      usuarioAdmin = {
        nombre: data[0].nomUsuario,
        password: data[0].contrasenia,
        esAdmin: data[0].tipoUsuario_id,
      };
      usuarioOperario = {
        nombre: data[1].nomUsuario,
        password: data[1].contrasenia,
        esAdmin: data[1].tipoUsuario_id,
      };

      document
        .getElementById("loginButton")
        .addEventListener("click", function () {
          const usuario = usuarioInput.value;
          const password = passwordInput.value;
          console.log(usuario, password);

          if (
            (usuarioAdmin.nombre === usuario &&
              usuarioAdmin.password === password) ||
            (usuarioOperario.nombre === usuario &&
              usuarioOperario.password === password)
          ) {
            localStorage.setItem("Usuario", usuario);
            localStorage.setItem("password", password);
            if (usuario === "adminLavadero") {
              esAdmin = true;
              localStorage.setItem("esAdmin", JSON.stringify(esAdmin));
              console.log(esAdmin);
            } else {
              localStorage.setItem("esAdmin", JSON.stringify(esAdmin));
              console.log(esAdmin);
            }
            alert("Usuario correcto");
            window.location.href = "../administrador/index.html";
          } else {
            alert("Usuario incorrecto");
          }
        });
    }
  })
  .catch((error) => {
    console.error("Error en la solicitud de fetch:", error);
  });
