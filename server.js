var express = require('express')

var path = require('path')
const fs = require('fs')
var app = express()
var PORT = process.env.PORT || 3001;
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(express.static('public'))


app.get("/", function(req, res) {
    res.json(path.join(__dirname, "public/index.html"));
  });
  
app.get('/note', function(request, response){

    fs.readFile('./data/data.json', (err, data) => {
        var note = JSON.parse(data)
        response.json(note)
    })
   
})

app.post('/newnote', function(request, response){
    var newNote = request.body
    
//     var string = JSON.stringify(newNote, null, 2)
// fs.writeFile('./data/data.json', string, {flag: 'a+'}, (err) => {
//     data.data.push(newNote)
//     console.log(string)
// })
fs.readFile('./data/data.json', 'utf-8', function(err, data) {
	if (err) throw err

	var note = JSON.parse(data)
	note.data.push(newNote)

	

	fs.writeFile('./data/data.json', JSON.stringify(note), 'utf-8', function(err) {
		if (err) throw err
		console.log('Done!')
	})
})



    response.json(newNote)
})




app.listen(PORT,() => {
console.log('daddys home')
})