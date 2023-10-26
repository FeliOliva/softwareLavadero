const usuarioInput = document.getElementById("usuario");
const passwordInput = document.getElementById("password");


fetch('http://localhost:3000/api/users/')
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        if (data.length > 0) {
            const usuarioBd = data[0].nomUsuario;
            const passwordBd = data[0].contrasenia;
            document.getElementById("loginButton").addEventListener("click", function () {
                const usuario = usuarioInput.value;
                const password = passwordInput.value;
                console.log(usuario,usuarioBd,password,passwordBd)
                if (usuarioBd == usuario && passwordBd == password) {
                    alert('usuario correcto')
                    window.location.href = '../administrador/index.html';
                    
                }
                else{
                    alert('usuario incorrecto')
                }
            });
        } else {
            console.log('No se encontraron usuarios en la respuesta.');
        }
    })
    .catch((error) => {
        console.error('Error en la solicitud de fetch:', error);
    });
