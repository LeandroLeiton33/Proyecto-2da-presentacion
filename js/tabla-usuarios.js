let tableUserBody = document.getElementById("table-body");
let usuariosAPintar = JSON.parse(localStorage.getItem("usuarios"));

console.log(usuariosAPintar);

const pintarUsuarios = (arrayUsuarios) => {
  tableUserBody.innerHTML = "";
  arrayUsuarios.forEach((user) => {
    tableUserBody.innerHTML += `
            <tr>
                <td class="table-nombre">${user.nombreCompleto}</td>
                <td class="table-email">${user.email}</td>
                <td class="table-rol">${user.rol}</td>
                <td class="table-btn-borrar">
                    <div class="d-flex gap-2">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarUsuario('${user.email}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
  });
};

pintarUsuarios(usuariosAPintar);

const borrarUsuario = (emailABuscar) => {
  Swal.fire({
    title: "Borrar usuario",
    icon: "error",
    text: "¿Realmente desea eliminar el usuario?",
    showCloseButton: true,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      const indiceEncontrado = usuariosAPintar.findIndex(
        (usuarioIndice) => usuarioIndice.email === emailABuscar
      );
      if (indiceEncontrado !== -1) {
        usuariosAPintar.splice(indiceEncontrado, 1);
        pintarUsuarios(usuariosAPintar);
        localStorage.setItem("usuarios", JSON.stringify(usuariosAPintar));
        Swal.fire("Borrado", "Usuario borrado correctamente", "success");
      }
    }
  });
};
