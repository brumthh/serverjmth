

class inicioController {

    async InicioView(req, res) {
        res.render('inicio/inicio', { layout: 'inicio/inicio' });
    }
    
}

module.exports = inicioController;