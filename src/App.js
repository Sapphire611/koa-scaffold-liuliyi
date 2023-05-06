const moment = require('moment');
const { redisService, mongodb, mqtt } = require('infra');
const logger = require('infra').logger.child({ module: 'app' });
const { webServer } = require('server');
const { name, version } = require('../package.json');
const { User, Role, Config } = require('model');
const md5 = require('md5');
/**
 * 整个程序的组织者
 */
class App {
    constructor() {
        this.logger = logger;
        this.mongodb = mongodb;
        this.redisService = redisService;
        this.webServer = webServer;
    }

    async open() {
        logger.info(`Project:[${name}], ver:[${version}], uptime: ${moment().format()}`);

        await this.mongodb.open();
        await this.redisService.open();
        await this.webServer.open();
        // mqtt.open();
        await this.tryInitDatabase();
    }

    async close() {
        await this.redisService.close();
        await this.mongodb.close();
        // mqtt.close();
    }

    async tryInitDatabase() {
        let adminRole = await Role.findOne({ code: 'admin' });
        if (!adminRole) {
            await Role.create({ name: '系统管理员', code: 'admin', authorities: ['admin', 'board'] });
            logger.info('Init Role [admin] success');
        }

        adminRole = await Role.findOne({ code: 'admin' });
        const adminUser = await User.findOne({ role: adminRole._id });
        if (!adminUser) {
            await User.create({
                source: 'manual',
                name: 'admin',
                mobile: '+10086',
                role: adminRole._id,
                password: md5('admin'),
            });
            logger.info('Init Admin success');
        }
    }
}

module.exports = new App();
