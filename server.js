//importando os packages instalados
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const PainelRoute = require('./routes/painelRoute');
const InicioRoute = require('./routes/inicioRoute');
const ClienteRoute = require('./routes/clienteRoute');
const CasaRoute = require('./routes/casaRoute');
const UsuariosRoute = require('./routes/usuariosRoute');



const app = express();


app.use(express.static(__dirname + "/public"))


app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.set('layout', './layout');
app.use(expressLayouts);


//rotas publicas

let inicioRota = new InicioRoute()
app.use("/", inicioRota.router);



//rotas privadas



let painelRota = new PainelRoute();
app.use("/admin", painelRota.router);
let clienteRota = new ClienteRoute();
app.use("/clientes", clienteRota.router);
let casaRota = new CasaRoute()
app.use("/casas", casaRota.router);
let usuarioRota = new UsuariosRoute();
app.use("/usuarios", usuarioRota.router);




//ponto de inicio do nosso servidor web
const server = app.listen('5000', function() {
    console.log('Servidor web iniciado');
});
