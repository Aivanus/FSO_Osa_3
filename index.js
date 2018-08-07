const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

morgan.token('body', (req, res) => {
	return JSON.stringify(req.body)
})

app.use(bodyParser.json())
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))
app.use(express.static('build'))
app.use(cors())

// let persons = [
//   {
//     "name": "Arto Hellas",
//     "number": "040-123456",
//     "id": 1
//   },
//   {
//     "name": "Martti Tienari",
//     "number": "040-123456",
//     "id": 2
//   },
//   {
//     "name": "Arto Järvinen",
//     "number": "040-123456",
//     "id": 3
//   },
//   {
//     "name": "Lea Kutvonen",
//     "number": "040-123456",
//     "id": 4
//   },
//   {
//     "name": "Hello",
//     "number": "1234",
//     "id": 5
//   }
// ]

app.get('/', (req, res) => {
	res.send('<h1>Persons API</h1>')
})

app.get('/api/persons', (req, res) => {
	Person
		.find({})
		.then(persons => {
			res.json(persons.map(Person.format))
		})
		.catch(error => {
			console.log(error)
			res.status(404).end()
		})
})

app.get('/api/persons/:id', (req, res) => {
	Person
		.findById(req.params.id)
		.then(person => {
			res.json(Person.format(person))
		})
		.catch(error => {
			console.log(error)
			res.status(404).end()
		})
})

app.get('/info', (req, res) => {
	Person
		.find({})
		.then(persons => {
			res.send('<p>Puhelinluettelossa on ' + persons.length + ' henkilön tiedot</p>' + new Date())
		})
})

app.post('/api/persons', (req, res) => {
	const body = req.body

	if (body.name === "" || body.number === "") {
		return res.status(400).json({ error: 'You must specify both name and number' })
	}

	Person
		.find({ name: body.name })
		.then(potentialPerson => {
			if (potentialPerson.length !== 0) {
				console.log(potentialPerson)
				return res.status(400).json({ error: 'The name must be unique!' })
			}
			const person = new Person({
				name: body.name,
				number: body.number
			})

			person
				.save()
				.then(savedPerson => {
					res.json(Person.format(savedPerson))
				})
		})

})

app.put('/api/persons/:id', (req, res) => {
	const body = req.body

	const person = {
		name: body.name,
		number: body.number
	}

	Person
		.findByIdAndUpdate(req.params.id, person, { new: true })
		.then(updatedPerson => {
			res.json(Person.format(updatedPerson))
		})
		.catch(error => {
			console.log(error)
			res.status(400).send({ error: 'malformatted id' })
		})
})

app.delete('/api/persons/:id', (req, res) => {
	Person
		.findByIdAndRemove(req.params.id)
		.then(result => {
			res.status(204).end()
		})
		.catch(error => {
			console.log(error)
			res.status(400).send({ error: 'malformatted id' })
		})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log('Server running on port ' + PORT)
})