// este documento tendra la informacion necesaria para la conecciona a mysql 
// por mediio de un objecto js 
module.exports = {
    mysql_database: {
        // nombre del host o servidor de la base de datos 
        host:'localhost',
        // usuario por el cual se llevara la coneccion 
        user:'root',
        // contraseña del usuario 
        password:'mibasededatos',
        // base de datos a la cual nos vamos a conectar 
        database:'mydb',
        // el puerto donde esta corriendo mysql, por defecto es el 3396, pero tuve problemas con mi xampp y lo cambie
        port: 3306
    }
}