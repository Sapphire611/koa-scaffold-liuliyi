'use strict';
const { OperationLog } = require('model');
const { liteCarouselPagination } = require('middleware/koa-pageable');
const escapeStringRegexp = require('escape-string-regexp');

class OperationLogService {
    constructor() {}

    /**
     * 查询系统日志
     * @param begin 开始时间
     * @param end 结束时间
     * @param page 页码
     * @param size 每页大小
     * @param level 日志级别
     * @param type 日志类型
     * @param key 用户名关键字
     * @returns {Promise<*>}
     */
    async search(begin, end, page, size, level, type, key) {
        const $match = { time: { $gte: begin, $lte: end } };
        if (level) {
            $match.level = level;
        }
        if (type) {
            $match.type = type;
        }
        if (key) {
            $match.userName = { $regex: new RegExp(`.*${escapeStringRegexp(key)}.*`) };
        }
        const result = await liteCarouselPagination(OperationLog, [{ $match }, { $sort: { time: -1 } }], page, size);
        return result || {};
    }
}

module.exports = new OperationLogService();
