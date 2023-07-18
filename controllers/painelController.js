
class PainelController {

    constructor() {

    }

    homeView(req, res) {
        res.render('home/index', {});
    }
}


module.exports = PainelController;