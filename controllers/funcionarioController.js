// Importa o model de funcionario
const model = require("../models/funcionarioModel");

/* =====================================================
   LISTAR FUNCIONÁRIOS
===================================================== */
exports.index = (req, res) => {

    const funcionarios = model.listar();

    res.render("funcionario/index", {
        funcionarios,
        funcionarioEditar: null
    });

};

/* =====================================================
   SALVAR NOVO FUNCIONÁRIO
===================================================== */
exports.salvar = (req, res) => {

    model.salvar({
        nome: req.body.nome.toUpperCase(),
        email: req.body.email,
        cargo: req.body.cargo
    });

    res.redirect("/funcionario");

};

/* =====================================================
   FORMULÁRIO EDITAR
===================================================== */
exports.formEditar = (req, res) => {

    const funcionarios = model.listar();

    const funcionarioEditar = model.buscarPorId(req.params.id);

    res.render("funcionario/index", {
        funcionarios,
        funcionarioEditar
    });

};

/* =====================================================
   EDITAR
===================================================== */
exports.editar = (req, res) => {

    model.editar(req.params.id, {
        nome: req.body.nome.toUpperCase(),
        email: req.body.email,
        cargo: req.body.cargo
    });

    res.redirect("/funcionario");

};

/* =====================================================
   EXCLUIR
===================================================== */
exports.excluir = (req, res) => {

    model.excluir(req.params.id);

    res.redirect("/funcionario");

};