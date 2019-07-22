'use strict';

// Model interface
module.exports = function(sequelize, DataTypes) {
    var Curso = sequelize.define(
        'Curso',
        {
            id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true, allowNull: false },
            titulo: { type: DataTypes.STRING, allowNull: false },
            descricao: { type: DataTypes.TEXT, allowNull: false },
        },
        {
            schema: 'public',
            tableName: 'curso',
            timestamps: true
        }
    );

    Curso.associate = function(models) {
        Curso.belongsTo(
            models.Professor,
            {
                as: 'professor',
                onUpdate: 'CASCADE', onDelete: 'CASCADE',
                foreignKey: { allowNull: false }
            }
        );
    }

    Curso.load_scopes = function(models) {
        Curso.addScope(
            'complete',
            {
                include: [{ association: 'professor', required: false }]
            }
        );
    }

    return Curso;
};