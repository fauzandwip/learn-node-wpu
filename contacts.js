import fs from 'fs'
import chalk from 'chalk'
import validator from 'validator'

const checkData = () => {
	const dirPath = './data'
	if (!fs.existsSync(dirPath)) {
		fs.mkdirSync(dirPath)
	}

	const dataPath = './data/contacts.json'
	if (!fs.existsSync(dataPath)) {
		fs.writeFileSync(dataPath, '[]', 'utf-8')
	}
}

const loadContact = () => {
	const file = fs.readFileSync('data/contacts.json', 'utf-8')
	const contacts = JSON.parse(file)
	return contacts
}

const saveContact = (name, email, noHP) => {
	const contact = { name, email, noHP }
	const contacts = loadContact()

	// check duplicate data
	const duplicate = contacts.find((contact) => contact.name === name)
	if (duplicate) {
		console.log(
			chalk.red.inverse.bold('Registered Contact, please use other name!')
		)
		return false
	}

	// check email
	if (email) {
		if (!validator.isEmail(email)) {
			console.log(chalk.red.inverse.bold('Invalid Email!'))
			return false
		}
	}

	// check noHP
	if (!validator.isMobilePhone(noHP, 'id-ID')) {
		console.log(chalk.red.inverse.bold('Invalid Cellphone Number!'))
		return false
	}

	contacts.push(contact)
	fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

	console.log(chalk.green.inverse.bold('Thanks for input your data'))
}

const listContact = () => {
	const contacts = loadContact()
	contacts.forEach((contact, i) => {
		console.log(`${i + 1}. ${contact.name} - ${contact.noHP}`)
	})
}

const detailContact = (name) => {
	const contacts = loadContact()
	const contact = contacts.find(
		(contact) => contact.name.toLowerCase() === name.toLowerCase()
	)
	if (!contact) {
		console.log(chalk.red.inverse.bold('Name not found!'))
		return false
	}

	console.log(chalk.cyan.inverse.bold(contact.name))
	console.log(contact.noHP)
	if (contact.email) console.log(contact.email)
}

const deleteContact = (name) => {
	const contacts = loadContact()

	// my algoritma
	// const contact = contacts.find(
	// 	(contact) => contact.name.toLowerCase() === name.toLowerCase()
	// )
	// const index = contacts.indexOf(contact)
	// contacts.splice(index, 1)

	// if(!contact) console.log(chalk.red.inverse.bold(`${name} not found!`))

	// wpu
	const newContacts = contacts.filter(
		(contact) => contact.name.toLowerCase() !== name.toLowerCase()
	)

	if (contacts.length === newContacts.length) {
		console.log(chalk.red.inverse.bold(`${name} not found!`))
		return false
	}

	fs.writeFileSync('data/contacts.json', JSON.stringify(newContacts))

	console.log(
		chalk.green.inverse.bold(
			`${name}'s contact data has been successfully deleted!`
		)
	)
}

export { checkData, saveContact, listContact, detailContact, deleteContact }
// module.exports = { checkData, writeQuestion, saveContact } es5
