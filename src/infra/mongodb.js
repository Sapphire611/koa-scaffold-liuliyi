const mongoose = require('mongoose');
const { timestamp } = require('misc');
const paginate = require('mongoose-paginate-v2');
const config = require('config');
const moment = require('moment');
const path = require('path');
const fs = require('fs');
const logger = require('infra').logger.child({ module: 'mongo' });
const childProcess = require('child_process');

class Mongodb {
    constructor({ host, user, password, dbName, authenticationDatabase }) {
        mongoose.plugin(timestamp);
        mongoose.plugin(paginate);
        mongoose.set('strictQuery', false);
        this.mongoose = mongoose;
        this.host = host;
        this.user = user;
        this.password = password;
        this.dbName = dbName;
        this.authenticationDatabase = authenticationDatabase;
    }

    async open() {
        try {
            await mongoose.connect(config.db, {});
            logger.info(`mongodb connected OK: ${config.db}`);
        } catch (error) {
            logger.error('mongodb connected FAILED: ', error);
        }
    }

    async close() {
        await mongoose.connection.close();
        await mongoose.disconnect();
        logger.info('mongodb closed.');
    }

    async drop() {
        await mongoose.connection.dropDatabase();
    }

    set(config) {
        const { host, user, password, dbName, authenticationDatabase } = config;
        this.host = host;
        this.user = user;
        this.password = password;
        this.dbName = dbName;
        this.authenticationDatabase = authenticationDatabase;
    }

    backup() {
        if (!this.dbName) throw new Error('dbName is required and can not be null!');

        const filepath = `${config.backup}/s365-db-${moment().format('YYYYMMDDHHmmss')}.archive`;
        const command = `mongodump${this.host ? ` -h ${this.host}` : ''}${this.user ? ` -u ${this.user}` : ''}${this.password ? `-p ${this.password}` : ''
            }${this.user && this.password ? ` --authenticationDatabase ${this.authenticationDatabase}` : ''} -d ${this.dbName
            } --gzip --archive=${path.normalize(filepath)}`;

        const isExist = fs.existsSync(config.backup);
        if (!isExist) {
            fs.mkdirSync(config.backup);
        }

        childProcess.execSync(command, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                throw Error('backup failed!');
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }

    restore(filename) {
        if (!this.dbName) throw new Error('dbName is required and can not be null!');
        if (!filename) throw new Error('filename is required and can not be null!');

        const filepath = `${config.backup}/${filename}`;
        const command = `mongorestore${this.host ? ` -h ${this.host}` : ''}${this.user ? ` -u ${this.user}` : ''}${this.password ? ` -p ${this.password}` : ''
            }${this.user && this.password ? ` --authenticationDatabase ${this.authenticationDatabase}` : ''} -d ${this.dbName
            } --drop --gzip --archive=${path.normalize(filepath)}`;

        childProcess.execSync(command, (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                throw Error('restore failed!');
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    }
}

module.exports = new Mongodb(config);
