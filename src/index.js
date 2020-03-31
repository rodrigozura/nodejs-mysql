//Este Archivo inicia la app
//Iniciamos el modulo de express
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');

const { database } = require('./keys');

//-------------------------------Inicializations
const app = express();

//------------------------------Settings - configuraciones que necesita mi servidor de express
app.set('port', process.env.PORT || 4000 );
app.set('views', path.join(__dirname, 'views'));
//dentro de exphbs tengo que darle un objeto con el nombre de la plantilla,
//que voy a utlizar, donde estaran las vistas que voy a utilizar, donde
//estan los parcial, que extenciones voy a usar, donde estar las funciones
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
    handlebars:allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', '.hbs');


//----------------------------Middlewares - son funciones que se ejecutan cada vez que un usuario o cliente envia una peticion
app.use(session({
    secret: 'faztmysqlnodesession',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
})); 
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


//----------------------------Global Variables - Variables globales - por ejemplo la autentificacion
app.use(( req, res, next ) => {
    app.locals.success = req.flash('success');
    next();

});



//-----------------------------Routes-------------------------------------
app.use( require('./routes') );
app.use( require('./routes/authentication') );
app.use('/links', require('./routes/links') );



//----------------------------Public - archivos publicos------------------------------
app.use(express.static(path.join(__dirname, 'public')));



//---------------------------Starting the server
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});
