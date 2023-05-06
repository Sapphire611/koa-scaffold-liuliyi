/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2023/2/20
 *  @Name       :   operator.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */
'use strict';
const { Transform } = require('stream');
const { OperationLog } = require('model');
const logger = require('infra').logger.child({ category: '', module: 'middleware:logOperator' });

// 接收日志消息, 每一千条或者每十秒同步一次MongoDB
class Operator extends Transform {
    constructor() {
        super({ objectMode: true });
        this._loopTime = 10000; // 10秒 同步一次
        this._loopGroup = 1000; // 1000条 同步一次
        this.count = 0; // 计数器
        this.logs = []; // 日志数组
        this.cache = []; // 缓存数组
        this.loopJob = this.loop(); // 定时器
    }

    /**
     * 接收日志消息
     * @param chunk
     * @param encoding
     * @param callback
     * @returns {Promise<void>}
     * @private
     */
    async _transform(chunk, encoding, callback) {
        this.count++;
        this.logs.push(chunk); // 接收日志消息
        if (this.count >= this._loopGroup) {
            this.cachePush(); // 缓存日志消息
            await this.flush(); // 同步MongoDB
            callback();
        } else {
            callback();
        }
    }

    /**
     * 缓存日志消息
     */
    cachePush() {
        if (this.logs.length === 0) return; // 无需缓存
        this.cache.push(this.logs); // 缓存日志消息
        this.count = 0; // 重置计数器
        this.logs = []; // 清空日志数组
    }

    /**
     *  定时器 10秒同步一次
     * @returns {number}
     */
    loop() {
        // logger.info('logOperator loop');
        clearTimeout(this.loopJob);
        return setTimeout(async () => {
            this.cachePush();
            await this.flush();
        }, this._loopTime);
    }

    /**
     * 同步MongoDB
     * @returns {Promise<void>}
     */
    async flush() {
        this.loopJob = this.loop(); // 重置定时器
        const cache = this.cache.pop(); // 尝试取出缓存
        if (!cache) return process.nextTick(() => {}); // 无需同步
        return this.insertMany(cache); // 同步MongoDB
    }

    /**
     * 批量插入日志
     * @param [logs] {Array} 日志数组
     * @returns {Promise<void>}
     */
    async insertMany(logs) {
        logs.reverse();
        await OperationLog.insertMany(logs);
        logger.info(`logOperator insertMany ${logs.length} logs`);
    }
}

const operator = new Operator();
operator.on('error', err => logger.error('logOperator error', err.toString()));

module.exports = operator;
