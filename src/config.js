'use strict';
(() => {
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    require('yargs')
        .options({
            run: {
                alias: 'r',
                describe: 'run your program',
                demandOption: false,
            },
            path: {
                alias: 'p',
                describe: 'provide a path to file',
                demandOption: false,
            },
            spec: {
                alias: 's',
                describe: 'program specifications',
            },
        })
        .help().argv;

    const { createLogger, format, transports } = require('winston');
    const { combine, timestamp, printf } = format;

    const logger = createLogger({
        transports: [],
    });

    if (process.env.NODE_ENV !== 'production') {
        const myFormat = printf(info => {
            return `${info.timestamp} ${info.level}: ${info.message}`;
        });

        logger.add(
            new transports.Console({
                format: combine(format.colorize(), format.simple(), timestamp(), myFormat),
            })
        );
    }

    module.exports.logger = logger;
})();
