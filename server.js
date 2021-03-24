const express = require('express')
const bodyParser = require('body-parser')
const app = express()
PORT = 3000
const MongoClient = require('mongodb').MongoClient

var config = require('./secrets/config');

app.use(bodyParser.urlencoded({ extended: true }))

//show index.html by default
// app.get('/', (req,res) => {
//     res.sendFile(__dirname+'/index.html')
// })


//callbacks:
// MongoClient.connect(connectionString, {
//   useUnifiedTopology: true
// }, (err, client) => {
//   if (err) return console.error(err)
//   console.log('Connected to Database')
// })

//promises:
MongoClient.connect(config.connectionString, { useUnifiedTopology: true })
  .then(client => {
      console.log('Connected to Database')
      const db = client.db('quotemaster')
      const quotesCollection = db.collection('quotes')

      app.set('view engine','ejs')

      //   app.use(/* */)
    //   app.get(/* */)
      app.get('/', (req, res) => {
          const cursor = db.collection('quotes').find().toArray()
              .then(results => {
              res.render('index.ejs', {quotes: results})
              })
          .catch(error => console.error(error))
          
      })
    //   app.post(/* */)
    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                res.redirect('/')
            })
        .catch(error => console.error(error))
    })
    //   app.listen(/* */)
  })
  .catch(error => console.error(error))


app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})

//preversew
