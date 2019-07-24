'use strict';

// Imports
const models = require('../models');
const helpers = require('../helpers/functions.js');
const error_handler = require('../helpers/error-handler.js');

// Controller models
const Professor = models.Professor;

// Controller interface
module.exports = {
    professorListar: listar,
    professorExibir: exibir,
    professorInserir: inserir,
    professorAtualizar: atualizar,
    professorRemover: remover
};

// Controller methods
function listar(request, response) {
    (async () => {
        var filtros = resgatar_filtros(request);
        return Professor.scope('complete').findAll(filtros)
                    .then(registros => helpers.response_array_list(registros, response))
                    .catch(error => error_handler.controller(error, response));
    })();
}

function exibir(request, response) {
    (async () => {
        var professor_id = helpers.get_request_parameter(request, 'professor_id');

        return Professor.scope('complete').findById(professor_id)
                    .then(registro => helpers.response_register(
                        registro, response, __('http.status.404')
                    ))
                    .catch(error => error_handler.controller(error, response));
    })();
}

function inserir(request, response) {
    (async () => {
        var body = helpers.get_request_parameter(request, 'body');

        return Professor.create(body)
                    .then(registro => response.status(201).send(registro))
                    .catch(error => error_handler.controller(error, response));
    })();
}

function atualizar(request, response) {
    (async () => {
        // Verificar existência do registro
        var professor_id = helpers.get_request_parameter(request, 'professor_id');
        var registro = await Professor.findById(professor_id);
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
        var professor_id = helpers.get_request_parameter(request, 'professor_id');
        var registro = await Professor.findById(professor_id);
        if(!registro)
            return response.status(404).send(__('http.status.404'));

        return registro.destroy()
                       .then(() => response.status(200).send(__('registro.removido')))
                       .catch(error => error_handler.controller(error, response));
    })();
}

// Controller support methods
function resgatar_filtros(request) {
    var filtros = helpers.init_search_filter();

    // Ordenação da listagem
    filtros.order = [['nome', 'ASC']];

    return filtros;
}