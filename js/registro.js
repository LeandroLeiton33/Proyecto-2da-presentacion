const usuariosInicial = [
    {
      nombreCompleto: "John Doe",
      email: "admin@admin.com",
      password: "admin",
      rol: "admin",
    },
    {
      nombreCompleto: "Juan Pedro",
      email: "juanpedro@example.com",
      password: "password",
      rol: "cliente",
    },
    {
      nombreCompleto: "Alicia Lamas",
      email: "alicialamas@example.com",
      password: "password",
      rol: "cliente",
    },
    {
      nombreCompleto: "Bob Wilson",
      email: "bobwilson@example.com",
      password: "password",
      rol: "cliente",
    },
  ];

  const formularioRegistro = document.getElementById("formulario-registro");
const usuarios = JSON.parse(localStorage.getItem("usuarios")) || usuariosInicial;

if (JSON.parse(localStorage.getItem("usuarios")) === null) {
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }


formularioRegistro.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const elementos = formularioRegistro.elements;
  const email = elementos.introducirEmail.value;

  if (usuarioExistente(email)) {
    Swal.fire("Error", "El correo ingresado ya está registrado", "error");
    return;
  }

  const password = elementos.introducirPassword.value;
  const repitPassword = elementos.repitPassword.value;

  if (password === repitPassword) {
    const nuevoUsuario = {
      nombreCompleto: elementos.introducirNombre.value,
      email: email,
      password: password,
      rol: "cliente"
    };

    Swal.fire("Registro correcto", "", "success");
    usuarios.push(nuevoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
    formularioRegistro.reset();
    elementos.introducirNombre.focus();

    console.log(usuarios);
  } else {
    Swal.fire("Error", "Las contraseñas ingresadas no coinciden", "error");
  }
});

function usuarioExistente(email) {
  return usuarios.some((usuario) => usuario.email === email);
}

