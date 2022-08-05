var mongoose = require('mongoose')

// const MONGODB_URI = process.env.MONGODB_URI
const MONGODB_URI = "mongodb+srv://jaime:jaime270802@todolistapp.kazjc1s.mongodb.net/test"
mongoose.Promise = global.Promise
console.log(MONGODB_URI);
// mongoose.connect("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.3")
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Conexión exitosa con la Base de Datos');
    })
    .catch((e) => {
        console.log('Error de conexión: ' + e);
    })