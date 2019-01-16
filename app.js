// importando do pacote mongodb o MongoClient, que permite acessar o mongodb
var MongoClient = require('mongodb').MongoClient;

// caminho onde o server está rodando
var servidor = 'mongodb://localhost:27017/db_devmedia';

// função connect do MongoCliente que recebe como parametro a url do servidor 
// e uma função que retorna erro caso ocorra problema durante a conexão
// e vai dar acesso ao bd a partir do argumento db 
MongoClient.connect(servidor, function(erro, db){
    if (erro)
        console.log("Erro ao estabelecer conexão:" + erro);
    else
        console.log("Conexão estabelecida com sucesso.");


//INSERIR
/*
// objeto para inserção
    var topico = {
        titulo: "Erro de compilação",
        conteudo: "Não consigo compilar meu projeto",
        tags: ["Java", "Android", "Mobile"]
    };

// cria coleção
    var colecao = db.collection("topicos");

// insere documento na coleção
colecao.insertOne(topico, function(erro, resultado){
    if(erro)
        console.log("Erro ao inserir documento: " + erro);
    else
        console.log("Documento inserido com sucesso");
});


// array de objetos para inserção
    var usuarios = [
        {login: "rsr", senha: "123"},
        {login: "fafirodrigues", senha: "456"},
        {login: "rafaelarodrigues90", senha: "789"}
    ]

// cria coleção
    var colecao = db.collection("usuarios");

// insere array de objetos na coleção
    colecao.insertMany(usuarios, function(erro, resultado){
        if(erro)
            console.log("Erro ao inserir documento: " + erro);
        else
            // propriedade insertedCount faz a contagem de docs inseridos no bd  
            console.log(resultado.insertedCount + " documentos inseridos");
    });

/* ************************************************************************** */

/*
//ATUALIZAR
//faz referencia a coleção
    var colecao = db.collection("topicos");

// identifica qual documento atualizar
    var filtro = { titulo: "Erro de compilação" };
    var newValues = { $set: { descrição: "Código não compilou" } };

// adiciona item/atualiza coleção
    colecao.updateOne(filtro, newValues, function(erro, resultado){
        if(erro)
            console.log("Erro ao atualizar documento: " + erro);
        else
            console.log("Documento atualizado com sucesso");           
    });


//faz referencia a coleção
    var colecao = db.collection("usuarios");

// identifica qual doc atualizar
    var filtro = { };
    var newValues = { $set: { senha: "1992"} };

//adiciona item/atualiza coleção
    colecao.updateMany(filtro, newValues, function(erro, resultado){
        if(erro)
            console.log("Erro ao atualizar documento: " + erro);
        else
            console.log("Documentos atualizados com sucesso");           
    });

/* ************************************************************************** */

/*
// DELETAR
//faz referencia a coleção
    var colecao = db.collection("usuarios");

// identifica qual doc atualizar
    var filtro = { login: "fafirodrigues" };

//adiciona item/atualiza coleção
    colecao.deleteOne(filtro, function(erro, resultado){
        if(erro)
            console.log("Erro ao remover documento: " + erro);
        else
            console.log("Documento removido com sucesso");           
    });


//faz referencia a coleção
var colecao = db.collection("usuarios");

// identifica qual doc atualizar
    var filtro = { login: /^r/ }; // deleta os registros que iniciam em "r"
    // var filtro = { } // deleta todos os registros

//adiciona item/atualiza coleção
    colecao.deleteMany(filtro, function(erro, resultado){
        if(erro)
            console.log("Erro ao remover documento: " + erro);
        else
            console.log("Documentos removidos com sucesso");           
    });

/* ************************************************************************** */

/*
// LISTAR

    var colecao = db.collection("usuarios");
    var filtro = { }

// listados em sintaxe json
    colecao.find(filtro).toArray(function(erro, documentos){
        console.log(documentos);
    });

// listados com sintaxe formatada
    colecao.find(filtro).toArray(function(erro, documentos){
        documentos.forEach(function(doc){
            console.log("Usuário: " + doc.login);
            console.log("Senha: " + doc.senha);
        }, this);
    });

/* **************************************************************************** */

/*
    var pessoas = {
        codigo: 1,
        nome: "Rafaela",
        endereço: {
            logradouro: "Vila do Presídio",
            complemento: "Rua C",
            bairro: "Bangu",
            cidade: "Rio de Janeiro",
            estado: "RJ"
        },
        status: "Ativo",
        pontos: 100
    }

    var colecao = db.collection("pessoas");

    colecao.insertOne(pessoas, function(erro, resultado){
        if(erro)
            console.log("Erro ao inserir documento: " + erro);
        else
            // propriedade insertedCount faz a contagem de docs inseridos no bd  
            console.log(resultado.insertedCount + " documentos inseridos");
    });
*/
    var colecao = db.collection("pessoas");

    colecao.updateOne({codigo: 1}, {$set: { "endereço.complemento" : "Rua C, casa 1"}}, function(erro, resultado){
        if(erro)
            console.log("Erro ao atualizar documento: " + erro);
        else
            console.log("Documento atualizado\n");
    });


    var colecao = db.collection("pessoas");
    
    colecao.find({ "endereço.estado" : "RJ" }).toArray(function (erro, documentos){
        documentos.forEach(function(doc){
            console.log("Codigo: " + doc.codigo);
            console.log("Nome: " + doc.nome);
            console.log("Logradouro: " + doc.endereço.logradouro + " - " + doc.endereço.complemento + " - " + doc.endereço.bairro);
            console.log("Cidade: " + doc.endereço.cidade + " - " + doc.endereço.estado);
            console.log("Status: " + doc.status);
            console.log("Pontos: " + doc.pontos);
            console.log("_______________________");
        }, this);
    });

// fecha banco de dados
    db.close();
});
