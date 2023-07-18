const CasaModel = require("../models/casaModel");

class CasaController {

    async listarView(req, res) {
        let cat = new CasaModel();
        let lista = await cat.listarCasas();
        res.render('casa/listar', {lista: lista});
    }

    async criarView(req, res) {
       
        res.render('casa/criar', {});
    }

    async gravar(req, res) {

        let ok = false;
        if(req.body != null) {
            if(req.body.nome != null && req.body.valor != null && req.body.rua != null) {
                    let casa = new CasaModel(0, req.body.nome, req.body.valor, req.body.rua);
                    ok = casa.gravar();
                }
            
        }

        res.send({ ok: ok})
    }

    async deletar(req, res){
        let ok = false;
        if(req.body.casaId != null && req.body.casaId > 0){
            let casaModel = new CasaModel();
            ok = casaModel.excluirCasa(req.body.casaId);
        }
        res.send({ok: ok})
    }


     async buscaCasa(req, res) {
        var ok = true;
        var msg = ""
        var retorno = null;
        if(req.body.id != null && req.body.id != ""){
            let prod = new CasaModel();
            prod = await prod.buscarCasa(req.body.id);

            retorno = {
                id: prod.casaId,
                nome: prod.casaNome,
                valor: prod.casaValor,
                rua: prod.casaRua

               
            };
        }
        else {
            ok = false;
            msg = "Parâmetro inválido!";
        }

        res.send({ ok: ok, msg: msg, retorno: retorno })
     }

     async alterarView(req, res) {
        let casaModel = new CasaModel();
    
        if (req.params != null && req.params.id != null) {
            let casaId = req.params.id;
            casaModel = await casaModel.buscarCasa(casaId);
        }
        
        let Casa = await casaModel.listarCasas();
        res.render('casa/alterar', { lista: Casa, alter: casaModel });
    }

    async alterarCasa(req, res){
        let ok = false;
        if(req.body != null) {
            if(req.body.id > 0 && req.body.nome != null && req.body.valor != null && req.body.rua != null) {
                    let casa = new CasaModel(req.body.id, req.body.nome, req.body.valor, req.body.rua);
                    casa.casaId = req.body.id;
                    casa.casaNome = req.body.nome;
                    casa.casaValor = req.body.valor;
                    casa.casaRua = req.body.rua;
                    ok = casa.gravar();

            }
        }

        res.send({ ok: ok})
    }

}

module.exports = CasaController;