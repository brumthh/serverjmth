const express = require('express');
const PainelController = require('../controllers/painelController');


class PainelRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor() {
        this.#router = express.Router();
    

        let ctrl = new PainelController();
        this.#router.get('/', ctrl.homeView);
        
    }
}

module.exports = PainelRoute;