const express = require('express')
const cors = require('cors')

const app = express()
const logger = require('./loggerMiddleware')

app.use(cors())
app.use(express.json())

app.use(logger)

let notes = [
    {
        "id": 1,
        "content": "javi es muy pesado",
        "date": "2021-06-23T17:30:34.098Z",
        "important": true
    },
    {
        "id": 2,
        "content": "help",
        "date": "2019-06-23T17:30:34.098Z",
        "important":false
    },
    {
        "id": 3,
        "content": "big",
        "date": "2010-06-23T17:30:34.098Z",
        "important": true
    }
]


app.get('/', (request,response) => {
    response.send('<h1> my dream</h1>')
})

app.get('/api/notes',(request, response) => {
    response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)

    if(note) {
        response.json(note)
    } else {
        response.status(404).end()
    }
})
    
app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id != id)
    response.status(204).end()
})

app.post('/api/notes', (request,response) => {
    const note = request.body

   const ids = notes.map(note => note.id)
   const maxId = Math.max(...ids)

   const newNote = {
       id:maxId+1,
       content: note.content,
       important: typeof note.important !== 'undefined' ? note.important : false,
       data: new Date().toISOString()
   }

   notes = notes.concat(newNote)

   response.json(newNote)
})

app.use ((request,response) => {
    response.status(404).json({
        error: 'Not funk whit me'
    })
})

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

