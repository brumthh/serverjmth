const express = require('express');
const ClienteController = require('../controllers/clienteController');



class ClienteRoute {

    #router;
    get router() {
        return this.#router;
    }
    set router(router) {
        this.#router = router
    }

    constructor(){
        this.#router = express.Router();
   
        
        let ctrl = new ClienteController();
        this.#router.get('/',ctrl.clienteView);
        this.#router.post('/listar', ctrl.listarClientes);
        this.#router.get('/cadastro', ctrl.cadastroView);
        this.#router.post("/cadastro", ctrl.cadastrar);
        this.#router.post('/excluir', ctrl.deletar);
        this.#router.get('/validar/:id', ctrl.validarView);
        this.#router.post('/validar',ctrl.validarCliente);
        this.#router.get('/alterar/:id',ctrl.alterarView);
        this.#router.post('/alterar',ctrl.alterarCliente);
    

    }

    
}

module.exports = ClienteRoute;