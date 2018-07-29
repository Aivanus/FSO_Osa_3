const express = require('express')
const app = express()

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

app.get('/api/persons', (req, res)=>{
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})