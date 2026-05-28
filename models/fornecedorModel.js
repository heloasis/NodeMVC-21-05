// Importa módulos
const fs = require("fs");
const path = require("path");

// Caminho do arquivo JSON
const caminho = path.join(__dirname, "../data/fornecedores.json");

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
   CADASTRAR NOVO FORNECEDOR (SEM EDIÇÃO)
===================================================== */
function salvar(fornecedor) {
    let fornecedores = lerDados();
    // Cria novo fornecedor com ID automático
    const novo = {
        id: fornecedores.length > 0
            ? fornecedores[fornecedores.length - 1].id + 1
            : 1,
        nome: fornecedor.nome
    };
    fornecedores.push(novo);
    salvarDados(fornecedores);
}

function buscarPorId(id) {
    const fornecedores = lerDados();
    return fornecedores.find(c => c.id == id);
}

function editar(id, novoFornecedor) {
    const fornecedores = lerDados();
    const index = fornecedores.findIndex(c => c.id == id);
    fornecedores[index].nome = novoFornecedor.nome;
    salvarDados(fornecedores);
}

function excluir(id) {
    const fornecedores = lerDados();
    const novaLista = fornecedores.filter(c => c.id != id);
    salvarDados(novaLista);
}
module.exports = {
    listar,
    salvar,
    buscarPorId,
    editar,
    excluir
};