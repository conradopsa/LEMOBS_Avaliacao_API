'use strict';

// Model interface
module.exports = function(sequelize, DataTypes) {
    var Professor = sequelize.define(
        'Professor',
        {
            id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
            nome: { type: DataTypes.STRING, allowNull: false }
        },
        {
            schema: 'public',
            tableName: 'professor',
            timestamps: true
        }
    );

    Professor.associate = function(models) {
        Professor.hasMany(
            models.Curso,
            { as: 'cursos', foreignKey: 'professor_id' }
        );
    }

    Professor.load_scopes = function(models) {}

    return Professor;
};