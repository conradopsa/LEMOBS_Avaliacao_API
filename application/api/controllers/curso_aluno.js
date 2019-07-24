'use strict';

// Imports
const models = require('../models');
const helpers = require('../helpers/functions.js');
const error_handler = require('../helpers/error-handler.js');

// Controller models
const CursoAluno = models.CursoAluno;

// Controller interface
module.exports = {
    alunoListar: listar,
    matricularAluno: inserir,
};

// Controller methods
function listar(request, response) {
    (async () => {
        var filtros = resgatar_filtros(request);
        return CursoAluno.scope('complete').findAll(filtros)
                    .then(registros => helpers.response_array_list(registros, response))
                    .catch(error => error_handler.controller(error, response));
    })();
}

function inserir(request, response) {
    (async () => {
        let curso_id = helpers.get_request_parameter(request, 'curso_id'),
            aluno_id = helpers.get_request_parameter(request, 'aluno_id');


        return CursoAluno.create({
            curso_id: curso_id,
            aluno_id: aluno_id
        })
                    .then(registro => response.status(201).send(registro))
                    .catch(error => error_handler.controller(error, response));
    })();
}

// Controller support methods
function resgatar_filtros(request) {
    var filtros = helpers.init_search_filter();

    // Ordenação da listagem
    filtros.order = [['curso_id', 'ASC']];

    return filtros;
}