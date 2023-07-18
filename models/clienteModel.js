const Database = require('../db/database');


const conexao = new Database();

class ClienteModel {

    #clienteId;
    #clienteCod;
    #clienteNome;
    #casanome;
    #clienteHora;
    #clienteDevolucao;
    #cpf;
    #tele;
    #data;
    #ok;
    

    get clienteId() { return this.#clienteId; } set clienteId(clienteId) {this.#clienteId = clienteId;}
    get clienteCod() { return this.#clienteCod; } set clienteCod(clienteCod) {this.#clienteCod = clienteCod;}
    get clienteNome() { return this.#clienteNome; } set clienteNome(clienteNome) {this.#clienteNome = clienteNome;}
    get casanome() { return this.#casanome; } set casanome(casanome) {this.#casanome = casanome;}
    get clienteHora() { return this.#clienteHora; } set clienteHora(clienteHora) {this.#clienteHora = clienteHora;}
    get clienteDevolucao() { return this.#clienteDevolucao; } set clienteDevolucao(clienteDevolucao) {this.#clienteDevolucao = clienteDevolucao;}
    get cpf() { return this.#cpf; } set cpf(cpf) {this.#cpf = cpf;}
    get tele() { return this.#tele; } set tele(tele) {this.#tele = tele;}
    get data() { return this.#data; } set data(data) {this.#data = data;}
    get ok() { return this.#ok; } set ok(ok) {this.#ok = ok;}

    constructor(clienteId,clienteCod,clienteNome,data,clienteHora,clienteDevolucao,cpf,tele,casanome,ok) {
        this.#clienteId = clienteId;
        this.#clienteCod = clienteCod;
        this.#clienteNome = clienteNome;
        this.#data = data;
        this.#clienteHora = clienteHora;
        this.#clienteDevolucao = clienteDevolucao;
        this.#cpf = cpf;
        this.#tele = tele;
        this.#casanome = casanome;
        this.#ok = ok;
    }

    
    async buscarCliente(id){
        let sql = 'select * from tb_cliente p inner join tb_casa c on p.cas_id = c.cas_id where cl_id = ?';
        let valores = [id];
        var rows = await conexao.ExecutaComando(sql, valores);

        let cliente = null;

        if(rows.length > 0){
            var row = rows[0];
        
            cliente = new ClienteModel(row['cl_id'], 
            row['cl_cod'], row['cl_nome'],row['cas_nome'], 
            row['cl_hora'], row["cl_dev"], row["CPF"], row['cl_tel'], row["cl_data"] ,row["cl_ok"]
            );

        }

        return cliente;
    }
    

    async listarClientes() {
        let sql = 'SELECT * FROM tb_cliente p INNER JOIN tb_casa c ON p.cas_id = c.cas_id';
              
        var rows = await conexao.ExecutaComando(sql);
      
        let listaRetorno = [];
      
        if (rows.length > 0) {
          for (let i = 0; i < rows.length; i++) {
            var row = rows[i];
      
            let cl_dev = row['cl_dev'];
            // Formata o valor de cl_dev com ":" entre os dois primeiros números e os dois últimos números
            if (cl_dev.length >= 4) {
                cl_dev = cl_dev.slice(0, 2) + ':' + cl_dev.slice(-2);
            }
      
            let cl_hora = row['cl_hora'];
            // Formata o valor de cl_dev com ":" entre os dois primeiros números e os dois últimos números
            if (cl_hora.length >= 4) {
                cl_hora = cl_hora.slice(0, 2) + ':' + cl_hora.slice(-2);
            }
      
            let cpf = row['CPF'];
            // Formata o valor do CPF no formato de CPF (###.###.###-##)
            cpf = cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');

            let tele = row['cl_tel'];
            // Formata o valor de cl_dev com ":" entre os dois primeiros números e os dois últimos números
            if (tele >= 11) {
                tele =  tele.slice(0, 2) + ' ' + tele.slice(2, 7) + '-' + tele.slice(7);
            }

            let dat = row['cl_data'];
            // Formata o valor de cl_dev com ":" entre os dois primeiros números e os dois últimos números
            if (dat.length >= 4) {
                dat = dat.slice(0, 2) + '/' + dat.slice(-2);
            }

              
            listaRetorno.push(new ClienteModel(
              row['cl_id'], 
              row['cl_cod'], 
              row['cl_nome'], 
              row['cas_nome'], 
              cl_hora, 
              cl_dev, 
              cpf,
              tele, 
              dat, 
              row['cl_ok']
            ));
          }
        }
      
        return listaRetorno;
}
 
// #clienteId;
//     #clienteCod;
//     #clienteNome;
//     #casanome;
//     #clienteHora;
//     #clienteDevolucao;
//     #cpf;
//     #tele;
//     #data;

async deletarCliente(clienteId) {
    let sql = "delete from tb_cliente where cl_id = ?"
    let valores = [clienteId];

    let result = conexao.ExecutaComandoNonQuery(sql, valores);

    return result;
}
    


async gravar() {
    let result = false;
    if (this.#clienteId == 0) {
      let sql = "INSERT INTO tb_cliente (cl_id, cl_cod, cl_nome, cas_id, cl_hora, cl_dev, CPF, cl_tel, cl_data) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
      let valores = [this.#clienteId, this.#clienteCod, this.#clienteNome, this.#casanome, this.#clienteHora, this.#clienteDevolucao, this.#cpf, this.#tele, this.#data];
      result = await conexao.ExecutaComandoNonQuery(sql, valores);
    } else {
        let sql = "UPDATE tb_cliente SET cl_cod = ?, cl_nome = ?, cl_data = ?, cl_dev = ?, CPF = ?, cl_tel = ?, cas_id = ? WHERE cl_id = ?";
        let valores = [this.#clienteCod, this.#clienteNome, this.#data, this.#clienteDevolucao, this.#cpf, this.#tele, this.#casanome, this.#clienteId];
        result = await conexao.ExecutaComando(sql, valores);
      }
      return result;
    }

    async validar() {
        let result = false;
        let sql = "update tb_cliente set cl_ok = ? where cl_id = ?";
        let valores = [this.#ok, this.#clienteId];

        result = await conexao.ExecutaComandoNonQuery(sql, valores);
      }



      async listar(termo, busca, ordenacao) {
        let sqlWhere = "";
        if (termo !== undefined && termo !== "") {
          if (busca === "1") {
            sqlWhere = `WHERE cl_nome LIKE '%${termo}%'`;
          } else if (busca === "2" && !isNaN(termo)) {
            sqlWhere = `WHERE CPF = ${termo}`;
          } else if (busca === "3" && !isNaN(termo)) {
            sqlWhere = `WHERE cl_data = ${termo}`;
          }
        }
      
        let sqlOrder = "";
        if (ordenacao === "1") {
          sqlOrder = "ORDER BY cl_nome";
        } else if (ordenacao === "2") {
          sqlOrder = "ORDER BY CPF";
        } else if (ordenacao === "3") {
          sqlOrder = "ORDER BY cl_data";
        }
      
        let sql = `SELECT cl_nome AS nomeCliente, cl_data AS data, tb_casa.cas_nome AS casa, cl_cod AS codigo, cl_hora AS hora, cl_dev AS devolucao, cpf, cl_ok AS ok, cl_tel, cl_id
              FROM tb_cliente
              JOIN tb_casa ON tb_cliente.cas_id = tb_casa.cas_id
                          ${sqlWhere}
                          ${sqlOrder}`;
      
        var rows = await conexao.ExecutaComando(sql);
      
        var relatorio = [];
      
        for (var i = 0; i < rows.length; i++) {
          var row = rows[i];
          var data = {
            clienteId: row["cl_id"],
            nomeCliente: row["nomeCliente"],
            data: formatarData(row["data"]),
            casa: row["casa"],
            codigo: row["codigo"],
            hora: formatarHora(row["hora"]),
            devolucao: formatarHora(row["devolucao"]),
            cpf: formatarCPF(row["cpf"]),
            tele: formatarTelefone(row["cl_tel"]),
            ok: row["ok"],
          };
      
          relatorio.push(data);
        }
      
        return relatorio;
      
      
        function formatarData(data) {
          if (data) {
            if (typeof data !== "string") {
              data = data.toString();
            }
            // Adicionando máscara de data (??/??)
            return data.replace(/^(\d{2})(\d{2})$/, "$1/$2");
          }
          return "";
        }
        
        function formatarHora(hora) {
          if (hora) {
            if (typeof hora !== "string") {
              hora = hora.toString();
            }
            // Adicionando máscara de hora (??:??)
            return hora.replace(/^(\d{2})(\d{2})$/, "$1:$2");
          }
          return "";
        }
      
      function formatarCPF(cpf) {
        if (cpf) {
          // Adicionando máscara de CPF (###.###.###-##)
          return cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, "$1.$2.$3-$4");
        }
        return "";
      }
      
      function formatarTelefone(telefone) {
        if (telefone) {
          // Adicionando máscara de telefone (## #####-####)
          return telefone.replace(/^(\d{2})(\d{5})(\d{4})$/, "$1 $2-$3");
        }
        return "";
      }
    
    }
      
      
      
     
     
      
}




 

module.exports = ClienteModel;