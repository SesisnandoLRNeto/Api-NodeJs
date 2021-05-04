const express = require('express')
const cors = require('cors')
const app = express()

const Advert = require('./models/Advert')


app.use(express.json())

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "https://fulanod.com.br")
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
  res.header("Access-Control-Allow-Headers", "X-PINGOTHER, Content-Type, Authorization")
  app.use(cors())
  next()
})

// const db = require('./models/db')

app.get('/', async function(req, res){
  await Advert
    .findAll({ order: [['id', 'DESC']]})
    .then(function(adverts) {
      res.json({ adverts: adverts })
    })
})

app.get('/view/:id', async(req, res) => {
  // res.send('ID' + req.params.id)
  await Advert.findByPk(req.params.id)
  .then(advert => {
    return res.json({
      error: false,
      advert
    })
  })
  .catch((error) => {
    return res.status(400)
    .json({
      error: true,
      message: "Error in find this id "
    })
  })
})

app.post('/register', async function(req, res) {
  const resultCad = await Advert.create(
    req.body
    // title: 'NandosPCs',
    // description: 'Promotion of PCS'
  // })
  )
  .then(function() {
    //res.send('Register success')
    return res.json({
      error: false,
      message: 'Success in register'
    })
  })
  .catch(function(error) {
    return res
          .status(400)
          .json({
            error: false,
            message: 'Error in register'
          })
  })
})

app.put('/edit', async (req, res) => {
  await Advert.update(req.body, {
    where: { id: req.body.id }
  })
  .then(function() {
    return res.json({
      error: false,
      message: 'Success update'
    })
  })
  .catch(function(error) {
    return res
          .status(400)
          .json({
            error: true,
            message: 'Erro in update register'
          })
  })
})

app.delete('/delete/:id', async (req, res) => {
  await Advert.destroy({
    where: { id: req.params.id }
  })
  .then(function(){
    return res
          .json({
            error: false,
            message: "Delete success"
          })
  })
  .catch(function(error) {
    return res
          .status(400)
          .json({
            error: true,
            message: "Error in delete register"
          })
  })
})

app.listen(8080, function(){  
  console.log("Server iniciado na porta 8080")
})