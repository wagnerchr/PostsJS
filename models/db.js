const Sequelize = require("sequelize")

// Conexão com Banco de Dados MySql
const sequelize = new Sequelize('sistemadecadastro', 'root', '123456', {
    host : "localhost",
    dialect: "mysql"
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}