var express = require('express')
var data = require('./data/data.js')
var path = require('path')
var app = express()
var port = 8080
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static('public'))

app.get('/note', function(request, response){
    return response.json(data)
})

app.post('/newnote', function(request, response){
    var newNote = request.body

    console.log(newNote)

    data.push(newNote)

    response.json(newNote)
})




app.listen(port,() => {
console.log('daddys home')
})