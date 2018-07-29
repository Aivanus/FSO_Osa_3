const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Martti Tienari",
    "number": "040-123456",
    "id": 2
  },
  {
    "name": "Arto Järvinen",
    "number": "040-123456",
    "id": 3
  },
  {
    "name": "Lea Kutvonen",
    "number": "040-123456",
    "id": 4
  },
  {
    "name": "Hello",
    "number": "1234",
    "id": 5
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Persons API</h1>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send('<p>Puhelinluettelossa on ' + persons.length + ' henkilön tiedot</p>' + date)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({ error: 'The name must be unique!' })
  }

  if (body.name === undefined || body.number === undefined) {
    return res.status(400).json({ error: 'You must specify both name and number' })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000)
  }

  persons = persons.concat(person)

  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)

  res.status(203).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})