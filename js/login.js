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


  const users = JSON.parse(localStorage.getItem("usuarios")) || usuariosInicial;


if( localStorage.getItem("usuarios") === null  ) {

    localStorage.setItem("usuarios", JSON.stringify(usuariosInicial))

}

const loginForm = document.getElementById("login")

    loginForm.addEventListener("submit", (event) => {
        //Evitar el comportamiento por defecto del evento submit
        event.preventDefault()
        //2- Obtener los datos ingresados por el usuario
        
        const emailInput = event.target.elements.email.value;
        const passwordInput = event.target.elements.password.value;

        //3- Primero buscar si tengo un usuario con ese email
        //Guardo ese usuario en una variable
        const userExist = users.find(usr => {
    
            if(usr.email === emailInput) {
                return true
            }
    
            return false;
        })
        console.log(userExist)
        if(!userExist || userExist.password !== passwordInput) {
        // if(!userExist) {
            Swal.fire("Login incorrecto", "Los datos ingresados son incorrectos", "error");
            return;
        }
        
    
        //HACER EL LOGIN
        Swal.fire("Login Correcto", "En breve será redireccionado", "success")
    
        // userExist.password = undefined
        delete userExist.password
    
        localStorage.setItem( "usuarioLogeado", JSON.stringify(userExist)   )
    
        setTimeout(function() {
            window.location.href = '/index.html'
        }, 2000)
    
        //Preguntar si ese usuario que yo encuentro tiene un password exactamente igual que persona ingreso
        
        // #Guardar ese usuario en localStorage 
        // !Mostramos un alert del usuario
    
    })