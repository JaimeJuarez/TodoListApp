const express = require('express')
const path = require('path')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routes')

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000
app.use('/', router)

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
})

require('./db/db')