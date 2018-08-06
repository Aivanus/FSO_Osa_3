const mongoose = require('mongoose')

const url = 'mongodb://<dbuser>:<dbpassword>@ds113452.mlab.com:13452/puhelinluettelo'

mongoose.connect(url)


const Person = mongoose.model('Person', {
	name: String,
	number: String,
	id: Number
})

if (process.argv[2]) {

	const person = new Person({
		name: process.argv[2],
		number: process.argv[3],
		id: Math.floor(Math.random() * 99999)
	})

	person
		.save()
		.then(response => {
			console.log('Lisätään henkilö ' + response.name + ' numero ' + response.number + ' luetteloon')
			mongoose.connection.close()
		})
} else {
	Person
		.find({})
		.then(result => {
			console.log('Puhelinluettelo:')
			result.forEach(p =>
				console.log(p.name + ' ' + p.number)
			)
			mongoose.connection.close()
		})
}
