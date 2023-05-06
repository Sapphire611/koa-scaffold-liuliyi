const path = require('path');
const config = require('config');
const logger = require('infra').logger.child({ module: 'server:web' });
const { entries, routers } = require('./routers');

const Koa = require('koa');
const koaStatic = require('koa-static');
const koaMount = require('koa-mount');
const koaJson = require('koa-json');
const koaBodyParser = require('koa-bodyparser');
const { userAgent } = require('koa-useragent');
const koaLogger = require('./middleware/koa-logger');
const cors = require('@koa/cors');
const requestId = require('koa-requestid');
const cache = require('koa-redis-cache')

const { auth } = require('./middleware/koa-auth');
const koaMongoose = require('./middleware/koa-mongoose');
const { errorHandler } = require('server/middleware/errorHandler');


class WebServer {
    constructor() {
        this.entries = entries;
        this.koa = this.build();
        this.server = null;
    }

    build() {
        let koa = new Koa();
        koa.proxy = true;

        koa.use(koaLogger());
        koa.use(errorHandler());
        koa.use(cors());
        koa.use(requestId());
        koa.use(koaMount('/api/v1', koaStatic(path.join(__dirname, 'public'))));
        koa.use(koaJson());
        koa.use(userAgent);
        koa.use(koaBodyParser());

        koa.use(auth());
        koa.use(koaMongoose());
        koa.use(cache({
            expire: 60,
        }))
        
        koa.use(routers());

        koa.on('error', (error, _ctx) => {
            logger.warn('koa encounter error :', error);
        });
        return koa;
    }

    async open() {
        return new Promise((resolve, reject) => {
            this.server = this.koa.listen(config.port, '0.0.0.0', () => {
                logger.info(`Web server started, please visit: http://:${config.port} (with ${process.env.NODE_ENV} mode)`);

                resolve();
            });
        });
    }

    async close() {
        if (!this.server) return;
        this.server.close();
        logger.info('Web server closed.');
    }
}

module.exports = new WebServer();
