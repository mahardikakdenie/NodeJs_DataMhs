// Mengambil argumen dari commandLine
const {simpanMahasiswa, listMahasiswa, detailMahasiswa, deleteMahasiswa} = require('./mahasiswa')
const yargs = require('yargs')
const { argv } = require('yargs')
yargs.command({
    command: "add",
    describe: "add new Contact",
    builder: {
        name: {
            describe: "Full Name",
            demandOption: true,
            type: "string"
        },
        email: {
            describe: "E-mail",
            demandOption: false,
            type: 'string'
        },
        hpNum: {
            describe: "phoneNumber",
            demandOption: true,
            type: 'string'
        },
        major: {
            describe: "Student Major",
            demandOption: true,
            type: 'string',
        }
    },
    handler: (argv) => {
        simpanMahasiswa(argv.name,argv.email,argv.hpNum, argv.major)
    }
}).demandCommand()


// show list contact name
yargs.command({
    command: "list",
    describe: "show all contact name",
    handler:() => {
        listMahasiswa()
    }
})

// Show Detail Contact
yargs.command({
    command: 'detail',
    describe: 'Show Data Contact',
    builder: {
        name: {
            describe: "Full Name",
            demandCommand: true,
            type: "string"
        },
    },
    handler: (argv) => {
        detailMahasiswa(argv.name)
    }
}).demandCommand()

// Delete Contact

yargs.command({
    command: 'delete',
    describe: 'Delete Data Contact',
    builder: {
        name: {
            describe: "Full Name",
            demandCommand: false,
            type: "string"
        },
        hpNum: {
            describe: "mobile phone number",
            demandOption: false,
            type: 'string'
        }
    },
    handler: (argv) => {
        deleteMahasiswa(argv.name, argv.hpNum)
    }
})
yargs.parse()















// const {tulisPertanyaan, simpanContact} = require('./contact')

// const main = async () => {
//     const nama = await tulisPertanyaan('Masukan Nama Anda : ')
//     const email = await tulisPertanyaan('Masukan E-mail Anda : ')
//     const noHp = await tulisPertanyaan('Masukan noHp Anda : ')

//     simpanContact(nama, email, noHp)
// }

// main()