const Redis = require('ioredis');
const config = require('config');
const logger = require('infra').logger.child({ module: 'redis' });
class RedisService {
    constructor() {
        this.redis = new Redis(config.redis);
        this.statisticsLock = 'roomBooking#syncStatistics';
        this.dingTalkLock = 'roomBooking#syncDingTalk';

        // auth
        this.redisKeyPerfTime = 'roomBooking#checkpin:';
        this.redisKeyPerfCode = 'roomBooking#smspin:';
        this.redisKeyPerfLimit = 'roomBooking#smscount:';
    }

    async open() {
        this.redis = new Redis(config.redis); // for test

        const result = await this.redis.ping();
        if (result === 'PONG') logger.info(`redis connected OK: ${config.redis}`);
        else throw new Error(`redis connected FAILED: ${config.redis}`);
    }

    async close() {
        try {
            await this.redis.quit();
            logger.info('redis closed.');
        } catch {
            /* ignore */
        }
    }

    // 试图获取锁，如果获取成功，返回true，否则返回false
    async acquireLock(lockName, expireTime) {
        const lockKey = `${lockName}`;
        const value = Date.now() + expireTime + 1;

        const result = await this.redis.setnx(lockKey, value);
        if (result === 1) {
            await this.redis.pexpire(lockKey, expireTime);
            return true;
        } else {
            return false;
        }
    }

    // 释放锁，如果释放成功，返回true，否则返回false
    async releaseLock(lockName) {
        const lockKey = `${lockName}`;

        const result = await this.redis.del(lockKey);
        return result === 1;
    }
}

module.exports = new RedisService();
