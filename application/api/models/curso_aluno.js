'use strict';

module.exports = function(sequelize, DataTypes) {
    let CursoAluno = sequelize.define(
        'CursoAluno',
        {
            curso_id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
            aluno_id: { type: DataTypes.BIGINT, primaryKey: true, allowNull: false },
        },
        {
            schema: 'public',
            tableName: 'curso_aluno',
            timestamps: false
        }
    );

    CursoAluno.associate = function(models) {
        //1 : 1
        CursoAluno.belongsTo(
            models.Curso,
            {
                as: 'curso', //onUpdate: 'CASCADE', onDelete: 'NO ACTION',
                foreignKey: { allowNull: false }
            },
        );

        CursoAluno.belongsTo(
            models.Aluno,
            {
                as: 'aluno', //onUpdate: 'CASCADE', onDelete: 'NO ACTION',
                foreignKey: { allowNull: false }
            }
        )

    };

    CursoAluno.load_scopes = function(models) {
        CursoAluno.addScope(
            'complete',
            {
                include: [
                    { association: 'curso', required: false },
                    { association: 'aluno', required: false }
                ]
            }
        );
    }

    return CursoAluno;
};