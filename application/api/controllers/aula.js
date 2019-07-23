'use strict';

// Imports
const models = require('../models');
const helpers = require('../helpers/functions.js');
const error_handler = require('../helpers/error-handler.js');

// Models
const Aula = models.Aula;

module.exports = {
    aulaListar: listar,
    aulaInserir: inserir
}

function resgatar_filtros(request) {
    var filtros = helpers.init_search_filter();

    // Ordenação da listagem
    filtros.order = [['id', 'ASC']];

    return filtros;
}

// Controller methods
function listar(request, response) {
    (async () => {
        try{
            var filtros = resgatar_filtros(request);

            let curso_id = helpers.get_request_parameter(request, "curso_id");
            filtros.where = {curso_id: curso_id};

            //console.log(filtros);

            return Aula.findAll(filtros)
                        .then(registros => helpers.response_array_list(registros, response))
                        .catch(error => {error_handler.controller(error, response); console.log(error);});
        }catch(err){
            console.log(err);
        }
        
    })();
}

function inserir(request, response) {
    (async () => {
        let body = helpers.get_request_parameter(request, 'body');

        body.curso_id = helpers.get_request_parameter(request, 'curso_id');

        return Aula.create(body)
                    .then(registro => response.status(201).send(registro))
                    .catch(error => error_handler.controller(error, response));
    })();
}
