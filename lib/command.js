exports.yargs = {
    command: 'captcha [options] <file>',
    describe: 'crack captchas like a boss',

    builder: function (builder) {
        const chalk = require('chalk')

        const banner = chalk.green(`
 ██████╗ █████╗ ██████╗ ████████╗ ██████╗██╗  ██╗ █████╗ 
██╔════╝██╔══██╗██╔══██╗╚══██╔══╝██╔════╝██║  ██║██╔══██╗
██║     ███████║██████╔╝   ██║   ██║     ███████║███████║
██║     ██╔══██║██╔═══╝    ██║   ██║     ██╔══██║██╔══██║
╚██████╗██║  ██║██║        ██║   ╚██████╗██║  ██║██║  ██║
 ╚═════╝╚═╝  ╚═╝╚═╝        ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝

`)

        builder.usage(`${banner}${this.original}`)

        builder.option('number', {
            type: 'boolean',
            alias: 'n',
            describe: 'Only crack numbers'
        })
    },

    handler: (argv) => {
        const fs = require('fs')
        const tesseractJs = require('tesseract.js')

        const options = {}

        if (argv.numbers) {
            options.tessedit_char_whitelist = '01234567890'
        }

        try {
            if (fs.statSync(argv.file).isDirectory()) {
                throw new Error(`${argv.file} must be a file`)
            }
        } catch (e) {
            console.error(e.message || e)

            process.exit(1)
        }

        tesseractJs.recognize(argv.file)
            .then((result) => {
                console.log(result.text.trim())

                process.exit(0)
            })
            .catch((err) => {
                console.error(err.message || err)

                process.exit(1)
            })
    } 
}
