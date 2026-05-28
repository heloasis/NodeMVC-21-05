// Importa módulos
const fs = require("fs");
const path = require("path");

// Caminho do arquivo JSON
const caminho = path.join(__dirname, "../data/clientes.json");

/* =====================================================
   LER DADOS
===================================================== */
function lerDados() {
    const dados = fs.readFileSync(caminho);
    return JSON.parse(dados);
}

/* =====================================================
   LISTAR
===================================================== */
function listar() {
    return lerDados();
}

/* =====================================================
   SALVAR DADOS NO JSON
===================================================== */
function salvarDados(dados) {
    fs.writeFileSync(
        caminho,
        JSON.stringify(dados, null, 2)
    );
}

/* =====================================================
   CADASTRAR NOVO CLIENTE (SEM EDIÇÃO)
===================================================== */
function salvar(cliente) {
    let clientes = lerDados();
    // Cria novo cliente com ID automático
    const novo = {
        id: clientes.length > 0
            ? clientes[clientes.length - 1].id + 1
            : 1,
        nome: cliente.nome
    };
    clientes.push(novo);
    salvarDados(clientes);
}

function buscarPorId(id) {
    const clientes = lerDados();
    return clientes.find(c => c.id == id);
}

function editar(id, novoCliente) {
    const clientes = lerDados();
    const index = clientes.findIndex(c => c.id == id);
    clientes[index].nome = novoCliente.nome;
    salvarDados(clientes);
}

function excluir(id) {
    const clientes = lerDados();
    const novaLista = clientes.filter(c => c.id != id);
    salvarDados(novaLista);
}
module.exports = {
    listar,
    salvar,
    buscarPorId,
    editar,
    excluir
};