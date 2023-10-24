const usuarioLogeado = JSON.parse(localStorage.getItem("usuarioLogeado"))
//Obtenemos elementos HTML
const headerUserName = document.getElementById("user-header-name")
const headerUserAction = document.getElementById("btn-action")
const navbarLink = document.querySelector("ul.navbar-nav#nav-list")


headerUserName.innerText = usuarioLogeado ? usuarioLogeado.nombreCompleto : ""


if(usuarioLogeado) {
    headerUserAction.innerHTML = `<button class="btn btn-danger" onclick="logout()">Logout</button>`
    //Checkear si el user logueado es ADMIN
    if(usuarioLogeado.rol === 'admin') {
        //Deberíamos pintar dichos botones

        const btnAdminProduct = document.createElement('li')
        btnAdminProduct.classList.add('nav-item')
        btnAdminProduct.id = 'nav-admin-product'

        // Si necesito agregarle la clase  active al botón
        const url = window.location.pathname;
        if(url.includes('admin.html')) {

            btnAdminProduct.classList.add('active')
        }
        const link = document.createElement('a')
        link.classList.add('nav-link',)
        link.href = '/pages/admin.html';
        link.innerText = 'Admin Productos'

        const url2 = window.location.pathname;
        if(url2.includes('usuarios.html')) {

            btnAdminProduct.classList.add('active')
        }
        const linkUser = document.createElement('a')
        linkUser.classList.add('nav-link',)
        linkUser.href= '/pages/usuarios.html';
        linkUser.innerText = 'Admin Usuarios'
        



        btnAdminProduct.appendChild(link)

        navbarLink.appendChild(btnAdminProduct)

    }


} else {
    headerUserAction.innerHTML = `<a class="btn btn-dark" href="/pages/login.html">Login</a>`
}




function logout() {
    localStorage.removeItem("usuarioLogeado")
    setTimeout(function() {
        window.location.href = "/index.html"
    }, 500)
}