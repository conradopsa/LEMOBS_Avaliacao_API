"use strict";

// Helper interface
module.exports = {
    get_request_parameter: get_request_parameter,
    get_request_file: get_request_file,
    response_array_list: response_array_list,
    response_register: response_register,
    response_download: response_download,
    init_search_filter: init_search_filter,
    build_range_criteria: build_range_criteria
};

function get_request_parameter(request, parameter) {
    return (request.swagger.params[parameter]) ?
    request.swagger.params[parameter].value : null;
}

function get_request_file(request, filename) {
    var files = request.files || null;

    if(files && Array.isArray(files)) {
        for(var i = 0, fl = files.length; i < fl; i++) {
            if(files[i].fieldname == filename)
                return files[i];
        }
    }

    return null;
}

function response_array_list(registers, response) {
    if(Array.isArray(registers) && registers.length)
        response.json(registers);
    else
        response.status(204).send();
}

function response_register(register, response, not_found_message) {
    if(register)
        response.json(register);
    else
        response.status(404).send(not_found_message);
}

function response_download(register, response, column_path, column_name, not_found_message) {
    if(register)
        response.status(200).download(register[column_path], register[column_name]);
    else
        response.status(404).send(not_found_message);
}

function init_search_filter() {
    return { where: {}, attributes: {} };
}

function build_range_criteria(min, max) {
    if(min && max)
        return { $gte: min, $lte: max };

    if(min)
        return { $gte: min };

    if(max)
        return { $lte: max }

    return null;
}