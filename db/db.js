var mongoose = require('mongoose')

mongoose.Promise = global.Promise

// mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.3")
mongoose.connect("mongodb://127.0.0.1:27017/TodoListApp")
    .then(() => {
        console.log('Conexión exitosa con la Base de Datos');
    })
    .catch((e) => {
        console.log('Error de conexión: ' + e);
    })