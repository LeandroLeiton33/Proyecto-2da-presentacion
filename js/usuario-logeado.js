const usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado"));
// Obtenemos elementos HTML
const headerUserName = document.getElementById("user-header-name");
const headerUserAction = document.getElementById("btn-action");
const navbarList = document.querySelector("ul.navbar-nav#nav-list");

headerUserName.innerText = usuarioLogeado ? usuarioLogeado.nombreCompleto : "";

if (usuarioLogeado) {
    headerUserAction.innerHTML = `<button class="btn btn-danger" onclick="logout()">Logout</button>`;
    
    // Checkear si el usuario logueado es ADMIN
    if (usuarioLogeado.rol === 'admin') {
        // Deberíamos pintar dichos botones

        const btnAdminProduct = document.createElement('li');
        btnAdminProduct.classList.add('nav-item');
        btnAdminProduct.id = 'nav-admin-product';

        const btnAdminUsers = document.createElement('li'); // Crear el botón para Admin Usuarios
        btnAdminUsers.classList.add('nav-item');
        btnAdminUsers.id = 'nav-admin-users';

        const linkAdminProduct = document.createElement('a');
        linkAdminProduct.classList.add('nav-link');
        linkAdminProduct.href = '/pages/admin.html';
        linkAdminProduct.innerText = 'Admin Productos';

        const linkAdminUsers = document.createElement('a'); // Crear el enlace para Admin Usuarios
        linkAdminUsers.classList.add('nav-link');
        linkAdminUsers.href = '/pages/usuarios.html';
        linkAdminUsers.innerText = 'Admin Usuarios';

        // Si necesitas agregarle la clase "active" a los botones
        const url = window.location.pathname;

        if (url.includes('admin.html')) {
            btnAdminProduct.classList.add('active');
        } else if (url.includes('usuarios.html')) {
            btnAdminUsers.classList.add('active');
        }

        btnAdminProduct.appendChild(linkAdminProduct);
        btnAdminUsers.appendChild(linkAdminUsers);

        // Agregar ambos botones al menú de navegación
        navbarList.appendChild(btnAdminProduct);
        navbarList.appendChild(btnAdminUsers);
    }
} else {
    headerUserAction.innerHTML = `<a class="btn btn-primary" href="/pages/login.html">Login</a>`;
}

function logout() {
    localStorage.removeItem("usuarioLogeado");
    setTimeout(function () {
        window.location.href = "/index.html";
    }, 500);
}
