//Para autenticar a los usuarios
//tendra las rutas de signin signup o todas las rutas relacionacionadas con el login
const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signup', ( req, res ) =>{

    res.render('auth/signup');

});

router.post('/signup', passport.authenticate('local.signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
}));

router.get('/profile', ( req, res ) => {
    res.send('this is your profile');
});

module.exports = router ;