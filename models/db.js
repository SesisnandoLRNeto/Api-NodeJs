const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('nodetest', 'root', 'uphard123', {
  host: 'localhost',
  dialect: 'mysql'
})

sequelize.authenticate()
.then(function(){
  console.log('Conection success')
})
.catch(function(error){
  console.log('Error')
})

module.exports = sequelize