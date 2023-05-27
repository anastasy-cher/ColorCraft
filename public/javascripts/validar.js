// recogemos y enviamos los datos al backend, para recibir la respues de si los campos estan correctos

// recogemos los datos de login.ejs para luego mandarlo a la comprobacion 
const boton = document.getElementById("button")
const text_fill = document.getElementById("text_fill")

// Boton esta a la escucha de ckick para recoger los datos del login
boton.addEventListener("click",async () => {

    const email = document.getElementById("email").value
    const password = document.getElementById("password").value

    console.log(email,password)

    try {
        // Haciendo peticion a ruta backend user.js
        await fetch("/login",{
            method:"POST",
            // Espicifamos al destino que se envian json
            headers: { "Content-Type" : "application/json" },
            body : JSON.stringify({
                email,password
            })
            // Recogemos el error del user.js(post("/login"))
        }).then(  (error) => 
            error.json()) 
        .then( (json_error) => {
            console.log(json_error)

            if (json_error.error){
                text_fill.textContent = "Usuario o contraseña incorrecta"
            }
        } )

    }catch (e){
        console.log(e)
        window.location.href = "/"
    }
})