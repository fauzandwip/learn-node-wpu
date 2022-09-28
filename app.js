import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import {
	checkData,
	detailContact,
	listContact,
	saveContact
} from './contacts.js'

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
			noHP: {
				describe: 'Number Phone',
				demandOption: true,
				type: 'string'
			}
		},
		handler(argv) {
			saveContact(argv.name, argv.email, argv.noHP)
		}
	})
	.demandCommand()
	.command({
		command: 'list',
		describe: 'Display all names and phone numbers',
		handler() {
			listContact()
		}
	})
	.command({
		command: 'detail',
		describe: 'Show contact details',
		builder: {
			name: {
				describe: 'name',
				demandOption: true,
				type: 'string'
			}
		},
		handler(argv) {
			detailContact(argv.name)
		}
	})
	.parse()
