'use strict';

// Model interface
module.exports = function(sequelize, DataTypes) {
    var Aula = sequelize.define(
        'Aula',
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
            curso_id: { type: DataTypes.BIGINT, allowNull: false },
            titulo: { type: DataTypes.STRING, allowNull: false },
            conteudo: { type: DataTypes.TEXT, allowNull: false },
        },
        {
            schema: 'public',
            tableName: 'aula',
            timestamps: true
        }
    );

    return Aula;
};