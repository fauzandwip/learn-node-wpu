import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { checkData, saveContact } from './contacts.js'

checkData()

yargs(hideBin(process.argv))
	.command({
		command: 'add',
		describe: 'Add new contact',
		builder: {
			name: {
				describe: 'Nama lengkap',
				demandOption: true,
				type: 'string'
			},
			email: {
				describe: 'Email',
				demandOption: false,
				type: 'string'
			},
			noHp: {
				describe: 'Number Phone',
				demandOption: true,
				type: 'string'
			}
		},
		handler(argv) {
			saveContact(argv.name, argv.email, argv.noHp)
		}
	})
	.parse()
