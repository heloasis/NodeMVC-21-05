// Importa o model de fornecedores
const model = require("../models/fornecedorModel");

/* =====================================================
   LISTAR FORNECEDORES
===================================================== */
exports.index = (req, res) => {
    const fornecedores = model.listar();
    res.render("fornecedores/index",
        {
            fornecedores,
            fornecedorEditar: null
        });
};

/* =====================================================
   SALVAR NOVO FORNECEDOR (SEM EDIÇÃO)
===================================================== */
exports.salvar = (req, res) => {
    model.salvar({
        nome: req.body.nome.toUpperCase()
    });
    res.redirect("/fornecedores");
};

exports.formEditar = (req, res) => {
    const fornecedores = model.listar();
    const fornecedorEditar = model.buscarPorId(req.params.id);
    res.render('fornecedores/index', {
        fornecedores,
        fornecedorEditar  
    });
}

exports.editar = (req, res) => {
    model.editar(req.params.id, {
        nome: req.body.nome.toUpperCase()
    });
    res.redirect('/fornecedores');
}

exports.excluir = (req, res) => {
    model.excluir(req.params.id);
    res.redirect('/fornecedores');
}