const express = require('express');
const inicioController = require('../controllers/inicioController');

class InicioRoute {

    #router;

    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {

        this.#router = express.Router();

        let ctrl = new inicioController();

        this.#router.get('/', ctrl.InicioView);
    }
}

module.exports = InicioRoute;