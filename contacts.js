import readline from 'readline'
import fs from 'fs'

// const coba = fs.readFileSync('coba.txt', 'utf-8')
// console.log(coba)

// const rl = readline.createInterface({
// 	input: process.stdin,
// 	output: process.stdout
// })

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

// const writeQuestion = async (question) => {
// 	return new Promise((resolve, reject) => {
// 		rl.question(question, (name) => {
// 			resolve(name)
// 		})
// 	})
// }

const saveContact = (name, email, noHP) => {
	const contact = { name, email, noHP }
	const file = fs.readFileSync('data/contacts.json', 'utf-8')
	const contacts = JSON.parse(file)

	// check duplicate data
	const duplicate = contacts.find((contact) => contact.name === name)
	if (duplicate) {
		console.log('Registered Contact, please use other name!')
		return false
	}

	contacts.push(contact)
	fs.writeFileSync('data/contacts.json', JSON.stringify(contacts))

	console.log('Thanks for input your data')
}

export { checkData, saveContact }
// module.exports = { checkData, writeQuestion, saveContact } es5
