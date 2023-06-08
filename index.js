const express = require('express');
const { dbconnection } = require('./database/config');
require('dotenv').config();

//create the express server
const app = express();

//dbconnection
dbconnection();


//Routes
app.get( '/', (req, res) => {
    res.status(400).json({
        ok:true,
        msg: 'Hola Mundo'
    })
})

//user: mean_user
//pwd: fJR9bzxJWev1VlLM

app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}` );
} )