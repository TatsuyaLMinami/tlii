const Sequelize = require('sequelize')
const initModels = require('./schema/init-models')
const { host, user, password, database, dialect } = require('./config/db_config')
const sequelize = new Sequelize(database, user, password, { host, dialect, define: { timestamps: false } })

module.exports = initModels(sequelize)