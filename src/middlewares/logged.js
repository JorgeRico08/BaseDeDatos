
// Un middleware es una funcion que se ejecuta despues de que el servidor
// reciba la solicitud, pero antes de enviar una respuesta.


// estructura de un moddleware:
// const [NomMiddleware] = (req, res, next)=>{}
// parametros:
// req = request (solicitud)
// res = response (respuesta)
// next = funcion que le dice al middleware que prosiga con el envio de la respuesta 
const isLogged = (req, res, next)=>{
    // ejemplo de uso
    logged = true
    // si un usuario esta logeado 
    if (logged == true) {
        // el servidor prosige en enviar la respuesta 
        next();
    } else {
        // si no esta logeado, manda el siguiente mensaje 
        res.send("Debes iniciar sesion primero");
    }
}

// exportamos nuestro middleware
exports.isLogged = isLogged;