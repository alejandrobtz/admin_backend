require('dotenv').config();
var cors = require('cors');

const express = require('express');
const { dbconnection } = require('./database/config');

//create the express server
const app = express();
app.use(cors());

//reading and parsing body
app.use(express.json());

//routing
app.use('/api/users',require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

//dbconnection
dbconnection();

//Routes
app.get( '/', (req, res) => {
    res.status(400).json({
        ok:true,
        msg: 'Hola Mundo'
    })
});


app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}` );
} )