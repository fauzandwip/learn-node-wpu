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

const saveContact = (name, email, noHp) => {
	const contact = { name, email, noHp }
	const file = fs.readFileSync('data/contacts.json', 'utf-8')
	const contacts = JSON.parse(file)

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

	// check noHp
	if (!validator.isMobilePhone(noHp, 'id-ID')) {
		console.log(chalk.red.inverse.bold('Invalid Cellphone Number!'))
		return false
	}

	contacts.push(contact)
	fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

	console.log(chalk.green.inverse.bold('Thanks for input your data'))
}

export { checkData, saveContact }
// module.exports = { checkData, writeQuestion, saveContact } es5
