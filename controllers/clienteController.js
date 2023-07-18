// const CasaModel = require("../models/categoriaModel");
const CasaModel = require("../models/casaModel");
const ClienteModel = require("../models/clienteModel");


class ClienteController {

    constructor(){

    }

    async deletar(req, res){
        let ok = false;
        if(req.body.clienteId != null && req.body.clienteId > 0){
            let clienteModel = new ClienteModel();
            ok = clienteModel.deletarCliente(req.body.clienteId);
        }
        res.send({ok: ok})
    }

    async clienteView(req, res) {
        let clie = new ClienteModel();
        let relatorio = await clie.listar();
        res.render('cliente/listar', {lista: relatorio});
    }


    async validarView(req, res) {
        let clienteModel = new ClienteModel();

        let listarCasas = [];

        if (req.params != null && req.params.id != null) {
            let clienteId = req.params.id;
            clienteModel = await clienteModel.buscarCliente(clienteId);
        }
        let casa = new CasaModel();
        listarCasas = await casa.listarCasas();
        
        let Cliente = await clienteModel.listarClientes();
        res.render('cliente/validar', { lista: Cliente, alter: clienteModel , listarCasas: listarCasas});
    }

    async buscaProduto(req, res) {
        var ok = true;
        var msg = ""
        var retorno = null;
        if(req.body.id != null && req.body.id != ""){
            let prod = new ClienteModel();
            prod = await prod.buscarCliente(req.body.id);

            retorno = {
                nome: prod.clienteNome,
                data: prod.data,
                casa: prod.casanome,
                codigo: prod.clienteCod,
                id: prod.clienteId,
                hora: prod.clienteHora,
                devolucao: prod.clienteDevolucao,
                cpf: prod.cpf,
                tele: prod.telefone,
                ok: prod.ok
                

               
          
               
            };
        }
        else {
            ok = false;
            msg = "Parâmetro inválido!";
        }

        res.send({ ok: ok, msg: msg, retorno: retorno })
     }

     async validarCliente(req, res){
        let ok = false;
        if(req.body != null) {
            if(req.body.id > 0 && req.body.ok != null) { 
                    let usuario = new ClienteModel(req.body.id, req.body.ok);
                    usuario.clienteId = req.body.id;
                    usuario.ok = req.body.ok;
                    ok = usuario.validar();
                }
          
        }

        res.send({ ok: ok})
    }
      

 

    async cadastrar(req, res){
        let ok = false;
        if(req.body != null){
            if(req.body.codigo != null && req.body.nome != null && req.body.data != null &&req.body.hora != null && req.body.devo != null && req.body.cpf != null && req.body.tele != null && req.body.casa != null) {
                let cliente = new ClienteModel(0,req.body.codigo,req.body.nome,req.body.data,req.body.hora,req.body.devo,req.body.cpf,req.body.tele,req.body.casa);
                ok = cliente.gravar();
            }        
        }
        let msg;

        if (ok) {
            msg = "Cliente cadastrado com sucesso";
        }
        else {
            msg = "Erro no cadastro do Cliente";
        }

        res.send({ ok : ok});
    
      }


    async cadastroView(req, res) {

        let listarCasas = [];

        let casa = new CasaModel();
        listarCasas = await casa.listarCasas();

        res.render('cliente/criar', { listarCasas: listarCasas });

   }

   async alterarView(req, res) {
    let clienteModel = new ClienteModel();

    let listarCasas = [];

    if (req.params != null && req.params.id != null) {
        let clienteId = req.params.id;
        clienteModel = await clienteModel.buscarCliente(clienteId);
    }
    let casa = new CasaModel();
    listarCasas = await casa.listarCasas();
    
    let Cliente = await clienteModel.listarClientes();
    res.render('cliente/alterar', { lista: Cliente, alter: clienteModel , listarCasas: listarCasas});
}


async alterarCliente(req, res){
    let ok = false;
    if(req.body != null) {
        if(req.body.id > 0 && req.body.cod != null && req.body.nome != null && req.body.data != null && req.body.hora != null && req.body.devo != null && req.body.cpf != null && req.body.tele != null && req.body.casa != null) { 
                let usuario = new ClienteModel(req.body.id, req.body.cod, req.body.nome, req.body.data, req.body.hora, req.body.devo, req.body.cpf, req.body.tele, req.body.casa);
                usuario.clienteId = req.body.id;
                usuario.clienteCod = req.body.cod
                usuario.clienteNome = req.body.nome;
                usuario.data = req.body.data;
                usuario.clienteHora = req.body.hora;
                usuario.clienteDevolucao = req.body.devo;
                usuario.cpf = req.body.cpf;
                usuario.tele = req.body.tele;
                usuario.casanome = req.body.casa;
                
                
                ok = usuario.gravar();
            }
      
    }

    res.send({ ok: ok})
}


    async listarClientes(req, res){
      let ok = false;
      let listaRetorno = [];
      if(req.body != undefined){
          let termo = req.body.termo;
          let busca = req.body.busca;
          let ordenacao = req.body.ordenacao;
          let pedido = new ClienteModel();
          listaRetorno = await pedido.listar(termo, busca, ordenacao);
          ok = true;
      }

      res.send({ok: ok, listaRetorno: listaRetorno});
  }


}

module.exports = ClienteController;