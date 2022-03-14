// ******************   Crear un servidor con express ******************
// Primero importamos el modulo express 
const { request } = require('express');
const express = require('express');
const res = require('express/lib/response');
const path = require('path'); //Modulo que nos ayuda administrar rutas dentro de nuestro proyecto
//Rutas 
//Importamos las rutas para usuarios 
const user = require('./routes/users');
// importamos nuestro middleware 
const myMiddleware = require('./middlewares/logged.js');


// *************************   MYSQL ***********************************
// Importamos nuestra conexion a mysql 
// const connection = require('./connectionSQL')


// ****************************  MONGODB *********************************
// Importamos nuestra conexion a MongoDB 
const connection = require('./connectionMondoDB')


// Crear nuestra aplicacion express
const app = express();
// Definir el puerto 
//const port = 3000;

// hacemos uso de nuestro middleware en nuestra aplicacion 
app.use(myMiddleware.isLogged);


// *************  Configuraciones **********************
// las configuraciones son parecidas al manejo de variables
// estructura:
// app.set('NombreConfiguracion','Valor');
app.set('title','Aplicación NodeJS'); //establecer una configuracion llamada title
app.set('port',3000); //definimos el puerto utilizando una configuracion
// Accedemos al valor de nuestra configuracion de la siguiente forma 
// app.get('NombreConfiguracion')

// ******************* Motor de plantilla **************************
// Un motor de plantillas es añadir funcionalidad a nuestros archivos html, inclustar js en nuestros archivos 
app.set('view engine', 'ejs'); // configurar el tipo de plantilla que vamos a utilizar
app.set('views', path.join(__dirname,'views')); //configuramos la ruta de nuestras vistas 

// Para trabajar con archivos estaticos, hacemos uso de un middleware parte de express,
// que nos ayuda a especificar la ruta de la carpeta public 
//app.use(express.static(__dirname+'/public')) // __dirname devuelve la ruta absoluta del directorio donde nos encontramos 
// otra forma de hacerlo (usando el modulo path)
app.use(express.static(path.join(__dirname,'public'))) //el metodo join, une rutas, siendo el resultado una concatenacion de diversas rutas
// Para visulaizar los datos enviados por el usuario (por consola)
app.use(express.urlencoded({extended:false}))
// Rutas
// ruta de tipo get 
app.get('/', (req, res) => {
    // se envia como respuesta, el mensaje "Bienvenidos" de tipo texto plano
    // res.send("Bienvenidos a todos");
    res.render('index'); // utilizamos la funcion render, para rendedizar una plantilla
});

// nuestra aplicacion express podra USAR todas las rutas que definamos en routes/users.js 
app.use('/users',user); //especificamos '/users' para que todas las rutas en user sean accesibles con desde este sufrijo



// Funcionalidad para que mi servidor de mi aplicacion escuche por un puerto 
app.listen(app.get('port'), ()=>{
    console.log("Mi "+app.get('title')+" esta corriendo en el puerto: "+app.get('port'));
});