'use strict';

// Imports
const models = require('../models');
const helpers = require('../helpers/functions.js');
const error_handler = require('../helpers/error-handler.js');

// Model
const Aluno = models.Aluno;

module.exports = {
    alunoListar: listar,
    alunoInserir: inserir,
    alunoExibir: exibir,
    alunoAtualizar: atualizar,
    AlunoRemover: remover,
}

function resgatar_filtros(request) {
    var filtros = helpers.init_search_filter();

    // Ordenação da listagem
    filtros.order = [['nome', 'ASC']];

    return filtros;
}

// Controller methods
function listar(request, response) {
    (async () => {
        try{
            var filtros = resgatar_filtros(request);
            return Aluno.findAll(filtros)
                        .then(registros => helpers.response_array_list(registros, response))
                        .catch(error => error_handler.controller(error, response));
        }catch(err){
            console.log(err);
        }
        
    })();
}

function exibir(request, response) {
    (async () => {
        var aluno_id = helpers.get_request_parameter(request, 'aluno_id');

        return Aluno.findById(aluno_id)
                    .then(registro => helpers.response_register(
                        registro, response, __('http.status.404')
                    ))
                    .catch(error => error_handler.controller(error, response));
    })();
}

function inserir(request, response) {
    (async () => {
        var body = helpers.get_request_parameter(request, 'body');

        return Aluno.create(body)
                    .then(registro => response.status(201).send(registro))
                    .catch(error => error_handler.controller(error, response));
    })();
}

function atualizar(request, response) {
    (async () => {
        // Verificar existência do registro
        var aluno_id = helpers.get_request_parameter(request, 'aluno_id');
        var registro = await Aluno.findById(aluno_id);
        if(!registro)
            return response.status(404).send(__('http.status.404'));

        var body = helpers.get_request_parameter(request, 'body');
        return registro.update(body)
                       .then(() => exibir(request, response))
                       .catch(error => error_handler.controller(error, response));
    })();
}

function remover(request, response) {
    (async () => {
        // Verificar existência do registro
        var aluno_id = helpers.get_request_parameter(request, 'aluno_id');
        var registro = await Aluno.findById(aluno_id);
        if(!registro)
            return response.status(404).send(__('http.status.404'));

        return registro.destroy()
                       .then(() => response.status(200).send(__('registro.removido')))
                       .catch(error => error_handler.controller(error, response));
    })();
}