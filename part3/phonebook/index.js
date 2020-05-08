const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      id: 1,
      Name: "Arto Hellas",
      date: "2019-05-30T17:30:31.098Z",
    },
    {
      id: 2,
      Name: "Dave Lave",
      date: "2019-05-30T18:39:34.091Z",
    },
    {
      id: 3,
      Name: "Linh Linh",
      date: "2019-05-30T19:20:14.298Z",
    }
  ]   



app.get('/', (req, res) => {
    res.send('<h1> Hello World! </h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if(person){
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res ) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if(!body.name){
        return res.status(400).json({
            error: 'name missing'
        })
    }
    
    const person = {
        id: generateId(),
        name: body.name,
        date: new Date()
    }
    persons = persons.concat(person)

    res.json(person)
})

const generateId = () => {
    return Math.floor(Math.random() * 100000)
}

app.get('/info', (req, res) => {
    res.send(`<h1> Phonebook has info for ${persons.length} people </h1>
     <p>${new Date()}</p>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})