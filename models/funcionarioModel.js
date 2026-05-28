// Importa módulos
const fs = require("fs");
const path = require("path");

// Caminho do arquivo JSON
const caminho = path.join(__dirname, "../data/funcionario.json");

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
   CADASTRAR NOVO FUNCIONÁRIO
===================================================== */
function salvar(funcionario) {

    const funcionarios = lerDados();

    const novo = {
        id:
            funcionarios.length > 0
                ? funcionarios[funcionarios.length - 1].id + 1
                : 1,

        nome: funcionario.nome,
        email: funcionario.email,
        cargo: funcionario.cargo
    };

    funcionarios.push(novo);

    salvarDados(funcionarios);

}

/* =====================================================
   BUSCAR POR ID
===================================================== */
function buscarPorId(id) {

    const funcionarios = lerDados();

    return funcionarios.find(f => f.id == id);

}

/* =====================================================
   EDITAR
===================================================== */
function editar(id, novoFuncionario) {

    const funcionarios = lerDados();

    const index = funcionarios.findIndex(f => f.id == id);

    if (index !== -1) {

        funcionarios[index] = {
            id: Number(id),
            nome: novoFuncionario.nome,
            email: novoFuncionario.email,
            cargo: novoFuncionario.cargo
        };

        salvarDados(funcionarios);

    }

}

/* =====================================================
   EXCLUIR
===================================================== */
function excluir(id) {

    const funcionarios = lerDados();

    const novaLista = funcionarios.filter(f => f.id != id);

    salvarDados(novaLista);

}

module.exports = {
    listar,
    salvar,
    buscarPorId,
    editar,
    excluir
};