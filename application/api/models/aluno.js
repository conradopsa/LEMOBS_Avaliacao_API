'use strict';

module.exports = function(sequelize, DataTypes) {
    let Aluno = sequelize.define(
        'Aluno',
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
            nome: { type: DataTypes.STRING, allowNull: false },
            data_nascimento: { type: DataTypes.DATE, allowNull: false },
        },
        {
            schema: 'public',
            tableName: 'aluno',
            timestamps: true
        }
    );

    //Aluno.load_scopes = function(models) {}

    return Aluno;
};