//Sera utilizado para almacenar todas las rutas principales de mi aplicacion
const express = require('express');
const router = express.Router();

router.get('/', ( req, res ) => {

    res.render('index');
    
});



module.exports = router ;