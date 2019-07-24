'use strict';

const models = require('../models');

// Model interface
module.exports = function(sequelize, DataTypes) {
    let Aula = sequelize.define(
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

   Aula.associate = function(models) {
        //1 : 1
        Aula.belongsTo(
            models.Curso,
            {
                as: 'curso', //onUpdate: 'CASCADE', onDelete: 'NO ACTION',
                foreignKey: { allowNull: false }
            }
        );

    };

    Aula.load_scopes = function(models) {
        Aula.addScope(
            'complete',
            {
                include: [
                    {
                        association: 'curso', required: false
                    }
                ]
            },
            { override: true }
        );
    };

    return Aula;
}
