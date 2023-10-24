const user = JSON.parse(localStorage.getItem("usuarioLogeado"))

if(!user || user.rol !== 'admin') {

    window.location.href = '/index.html'

}