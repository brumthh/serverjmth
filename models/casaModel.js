const Database = require('../db/database');

const conexao = new Database();
class CasaModel {

    #casaId;
    #casaNome;
    #casaValor;
    #casaRua;

    get casaId() { return this.#casaId; } set casaId(casaId) {this.#casaId = casaId;}
    get casaNome() { return this.#casaNome; } set casaNome(casaNome) {this.#casaNome = casaNome;}
    get casaValor(){ return this.#casaValor; } set casaValor(casaValor){ this.#casaValor = casaValor;}
    get casaRua(){ return this.#casaRua; } set casaRua(casaRua){ this.#casaRua = casaRua;}

    constructor(casaId, casaNome,casaValor,casaRua) {
        this.#casaId = casaId
        this.#casaNome = casaNome
        this.#casaValor = casaValor
        this.#casaRua = casaRua
        
    }


    async listarCasas() {

        let sql = 'select * from tb_casa';
        
        var rows = await conexao.ExecutaComando(sql);

        let listaRetorno = [];

        if(rows.length > 0){
            for(let i=0; i<rows.length; i++){
                var row = rows[i];
                listaRetorno.push(new CasaModel(row['cas_id'], row['cas_nome'], row['cas_valor'], row['cas_rua']));
            }
        }

        return listaRetorno;
    }

    async gravar() {
        let result = false;
        if(this.#casaId == 0){
            let sql = "insert into tb_casa (cas_id, cas_nome, cas_valor, cas_rua) values (?, ?, ?, ?)";
            let valores = [this.#casaId, this.#casaNome, this.#casaValor, this.#casaRua];
    
            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }
        else{
            let sql = "update tb_casa set cas_nome = ?, cas_valor = ?, cas_rua = ? where cas_id = ?";
            let valores = [this.#casaNome, this.#casaValor, this.#casaRua , this.#casaId];

            result = await conexao.ExecutaComandoNonQuery(sql, valores);
        }

        return result;

    }

    async excluirCasa(casaId) {
        let sql = "delete from tb_casa where cas_id = ?"
        let valores = [casaId];
    
        let result = conexao.ExecutaComandoNonQuery(sql, valores);
    
        return result;
    }


    async buscarCasa(id){
        let sql = 'select * from tb_casa where cas_id = ?';
        let valores = [id];
        var rows = await conexao.ExecutaComando(sql, valores);

        let casa = null;

        if(rows.length > 0){
            var row = rows[0];
        
            casa = new CasaModel(row['cas_id'], row['cas_nome'], row['cas_valor'], row['cas_rua']);

        }

        return casa;
    }

    async listarCasas() {
        let sql = 'SELECT * FROM tb_casa';
              
        var rows = await conexao.ExecutaComando(sql);
      
        let listaRetorno = [];
      
        if (rows.length > 0) {
          for (let i = 0; i < rows.length; i++) {
            var row = rows[i];
    
            listaRetorno.push(new CasaModel(
              row['cas_id'], 
              row['cas_nome'], 
              row['cas_valor'], 
              row['cas_rua'], 
            ));
          }
        }
      
        return listaRetorno;
}

}

module.exports = CasaModel;