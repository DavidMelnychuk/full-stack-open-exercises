const express = require('express')
const app = express()

app.use(express.json())

let persons = [
    {
      id: 1,
      Name: "Arto Hellas",
      number: "1234612"
    },
    {
      id: 2,
      Name: "Dave Lave",
      number: "23411234125"
    },
    {
      id: 3,
      Name: "Linh Linh",
      number: "123412351235"
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
    
    if(!body.name || !body.number){
        return res.status(400).json({
            error: 'name or number is missing'
        })
    }

    if(persons.map(person => person.name).includes(body.name)){
        return res.status(400).json({
            error: 'name already exists'
        })
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
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