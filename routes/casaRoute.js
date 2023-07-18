const express = require('express');
const CasaController = require('../controllers/casaController');


class CasaRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();
      

        let ctrl = new CasaController()
        this.#router.get('/', ctrl.listarView);
        this.#router.get('/criar', ctrl.criarView);
        this.#router.post('/criar', ctrl.gravar)
        this.#router.post('/excluir', ctrl.deletar);
        this.#router.get('/alterar/:id', ctrl.alterarView);
        this.#router.post('/alterar', ctrl.alterarCasa);
    }
     
}

module.exports = CasaRoute;