
let vasosIniciales = [
  {
    titulo: "Vaso camiseta Messi",
    descripcion:
      "Vaso fernetero de la camiseta del capitan de la seleccion Argentina.",
    precio: 5000,
    imagen:
      "https://http2.mlstatic.com/D_NQ_NP_819223-MLA72366524529_102023-O.webp",
    id: "8779b233-fee1-4700-90e0-3f8ce64b1318",
    fecha:"2023/10/24"
  },
  {
    titulo: "Vaso Campeon del Mundo",
    descripcion:
      "Vaso Chopero con la silueta de la copa mas deseada. Para que nunca dejes de sentirte un campeon.",
    precio: 4000,
    imagen:
      "https://files.cults3d.com/uploaders/16864247/illustration-file/db0770ab-56d8-4e6f-ac76-d7fc87ee8059/untitled.39.jpg",
    id: "f4ff86bb-754e-4720-860e-6e3fadbd7d39",
    fecha:"2023/10/24"
  },
  {
    titulo: "Vaso marcas de auto",
    descripcion: "Vaso Chopero para los amantes de los fierros.",
    precio: 4000,
    imagen:
      "https://files.cults3d.com/uploaders/27173511/illustration-file/547de209-c0a9-43e1-88b6-7aa5dd108851/chop-chevrolet-1-litro_2023-Jun-16_06-52-16PM-000_CustomizedView18699632341.png",
    id: "97f2e494-e658-41ef-8ed0-ccf51e248cb8",
    fecha:"2023/10/24"
  },
  {
    titulo: "Vaso Messi",
    descripcion:
      "Vaso chopero del mejor del mundo en su version Inter de Miami.",
    precio: 4000,
    imagen: "https://http2.mlstatic.com/D_891483-MLA69878034474_062023-F.jpg",
    id: "8c1bd42c-33e7-45a0-b60e-5ff55717680b",
    fecha:"2023/10/24"
  },
];


let idEditar;
const btn = document.querySelector('button.btn[type="submit"]');
const btnCancelar = document.getElementById("cancelar");
const tableBodyHTML = document.querySelector("#table-body");
const inputFiltrarHTML = document.getElementById("filtrar")
const formularioProductoHTML = document.getElementById("formularioProducto");

let vasosProducto =
  JSON.parse(localStorage.getItem("productosCargados")) || vasosIniciales;

if (JSON.parse(localStorage.getItem("productosCargados")) === null) {
  localStorage.setItem("productosCargados", JSON.stringify(vasosProducto));
}

pintarProductos(vasosProducto);

function pintarProductos(arrayAPintar) {
  tableBodyHTML.innerHTML = "";

  arrayAPintar.forEach(function (vaso) {
    tableBodyHTML.innerHTML += `
            <tr>
                <td class="table-image">
                    <img src="${vaso.imagen}" alt="${vaso.titulo}">
                </td>
                <td class="table-title">${vaso.titulo}</td>
                <td class="table-description">${vaso.descripcion}</td>
                <td class="table-price">${vaso.precio}</td>
                <td>
                    <div class="d-flex gap-2">
                        <button class="btn-delete btn btn-danger btn-sm" onclick="borrarProducto('${vaso.id}')">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                        <button class="btn btn-success btn-sm" onclick="editarProducto('${vaso.id}')" data-bs-toggle="modal" data-bs-target="#formModal">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </div>
                </td>
            </tr>`;
  });
}

inputFiltrarHTML.addEventListener('keyup', (evt) => {
  const busqueda = evt.target.value.toLowerCase();
  const resultado = vasosProducto.filter((vasoFiltro) => {

    const { titulo } = vasoFiltro;
    return titulo.toLowerCase().includes(busqueda);
  });
  pintarProductos(resultado);
});


const borrarProducto = (idABuscar) => {
  Swal.fire({
    title: "Desea borrar producto",
    icon: "error",
    text: "¿Realmente desea eliminar el producto?",
    showCloseButton: true,
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonText: "Borrar",
  }).then((result) => {
    if (result.isConfirmed) {
      const indiceEncontrado = vasosProducto.findIndex(
        (productoFindIndex) => productoFindIndex.id === idABuscar
      );
      if (indiceEncontrado !== -1) {
        vasosProducto.splice(indiceEncontrado, 1);
        pintarProductos(vasosProducto);
        localStorage.setItem("productosCargados", JSON.stringify(vasosProducto));
        Swal.fire("Borrado", "Producto borrado correctamente", "success");
      }
    }
  });
};


formularioProductoHTML.addEventListener("submit", (evt) => {
  evt.preventDefault();

  const el = formularioProductoHTML.elements;

  const id = idEditar ? idEditar : crypto.randomUUID();

  const nuevoProducto = {
    descripcion: el.descripcion.value,
    id: id,
    imagen: el.imagen.value,
    precio: el.precio.valueAsNumber,
    titulo: el.titulo.value,
    fecha: obtenerFecha()
  };

  if (idEditar) {
    const index = vasosProducto.findIndex((vaso) => {
      return vaso.id === idEditar;
    });
 
    vasosProducto[index] = nuevoProducto;
    idEditar = undefined;

    btn.innerText = "Agregar producto";
    btn.classList.remove("btn-success");
  } else {
    vasosProducto.push(nuevoProducto);
  }

  Swal.fire({
    icon: "success",
    title: "Producto agregado/modificado correctamente",
    text: "El producto se actualizó o modificó correctamente",
  });

  pintarProductos(vasosProducto);
  localStorage.setItem("productosCargados", JSON.stringify(vasosProducto));
  formularioProductoHTML.reset();
  el.titulo.focus();
});


const editarProducto = function (idRecibido) {
  const productoEditar = vasosProducto.find((prod) => prod.id === idRecibido);

  if (!productoEditar) return;

  idEditar = productoEditar.id;
  const elements = formularioProductoHTML.elements;

  elements.titulo.value = productoEditar.titulo;
  elements.descripcion.value = productoEditar.descripcion;
  elements.precio.value = productoEditar.precio;
  elements.imagen.value = productoEditar.imagen;
  btn.innerText = "Editar Producto";
  btn.classList.add("btn-success");
};

btnCancelar.addEventListener("click", () => {
  btn.innerText = "Agregar producto";
  btn.classList.remove("btn-success");
  formularioProductoHTML.reset();
  el.titulo.focus();
  
});

function obtenerFecha() {
    const fecha = new Date()
    let mes = fecha.getMonth() + 1;
    if(mes < 10) {
        mes = '0'+ mes
    }
    let dia = fecha.getDate()
    if(dia < 10) {
        dia = '0' + dia
    }
    const year = fecha.getFullYear()

    const fechaFormateada = `${year}-${mes}-${dia}`
    return fechaFormateada
}
