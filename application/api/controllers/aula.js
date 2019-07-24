'use strict';

// Imports
const models = require('../models');
const helpers = require('../helpers/functions.js');
const error_handler = require('../helpers/error-handler.js');

const Sequelize = models.Sequelize;
const sequelize = models.sequelize
const Op = Sequelize.Op;

// Models
const Aula = models.Aula;

module.exports = {
    aulaListar: listar,
    aulaInserir: inserir,
    aulaResgatar: resgatar,
    aulaAtualizar: atualizar,
    aulaRemover: remover
}


function resgatar_filtros(request) {
    var filtros = helpers.init_search_filter();

    // Ordenação da listagem
    filtros.order = [['id', 'ASC']];
    
    return filtros;
}

function resgatar_filtros_aulaCurso(request) {
    let aula_id = helpers.get_request_parameter(request, 'aula_id');
    let curso_id = helpers.get_request_parameter(request, 'curso_id');

    // Ordenação da listagem
    let filtros = {};
    
    filtros.order = [['id', 'ASC']];

    filtros.where = {
                        [Op.and]: 
                        [   {id: aula_id},
                            {curso_id: curso_id} ]
                    };

    return filtros;
}

function resgatar(request, response) {
    (async () => {

        try{

            let filtros = resgatar_filtros_aulaCurso(request);

            return Aula.scope('complete').findOne(filtros)
                        .then(registro => helpers.response_register(
                            registro, response, __('http.status.404')
                        ))
                        .catch(error => {error_handler.controller(error, response); console.log(error)});
        }catch(error){
            console.log(error);
        }
        
    })();
}


function atualizar(request, response) {
    (async () => {

        let filtros = resgatar_filtros_aulaCurso(request);

        var registro = await Aula.findOne(filtros);

        if(!registro)
            return response.status(404).send(__('http.status.404'));

        var body = helpers.get_request_parameter(request, 'body');
        
        return registro.update(body)
                       .then(() => resgatar(request, response))
                       .catch(error => error_handler.controller(error, response));
    })();
}

function remover(request, response) {
    (async () => {
        
        try{
            //var aluno_id = helpers.get_request_parameter(request, 'aula_id');

            let filtros = resgatar_filtros_aulaCurso(request);

            let registro = await Aula.findOne(filtros);

            if(!registro)
                return response.status(404).send(__('http.status.404'));

            return registro.destroy()
                        .then(() => response.status(200).send(__('registro.removido')))
                        .catch(error => error_handler.controller(error, response));
        }
        catch(err){
            console.log(err);
        }
        
    })();
}

// Controller methods
function listar(request, response) {
    (async () => {
        try{
            var filtros = resgatar_filtros(request);

            let curso_id = helpers.get_request_parameter(request, "curso_id");
            filtros.where = {curso_id: curso_id};

            //console.log(filtros);

            return Aula.scope('complete').findAll(filtros)
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
