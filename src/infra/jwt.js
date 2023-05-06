/**
 * 提供jwt签名和解码能力
 * - encode
 * - decode
 *
 * payload描述:
 * - user: id
 * - device: code
 * - client: name
 */
const jwt = require('jsonwebtoken');
const config = require('config');
const moment = require('moment');

class Jwt {
    /**
     * 注册
     * @param {string} payload
     * @returns {string}
     */
    sign(payload, options = { expiresIn: '1d' }, callback) {
        const token = jwt.sign(payload, config.security.jwtSecret, options, callback);
        return token;
    }

    /**
     * 解包
     * @param {string} token
     * @returns {Object}
     */
    decode(token) {
        const decoded = jwt.verify(token, config.security.jwtSecret);

        if (!(decoded.exp || decoded.exp > moment().unix())) {
            throw Error('jwt expired');
        }
        return decoded;
    }

    /**
     * 获取过期时间
     * @param {string} token
     * @returns {any}
     */
    exp(token) {
        return jwt.verify(token, config.security.jwtSecret).exp;
    }

    /**
     * 是否过期
     * @param {string} token
     * @returns {boolean}
     */
    isExp(token) {
        // console.log(this.exp(token));
        // console.log(moment().unix());
        return this.exp(token) < moment().unix();
    }
}

module.exports = new Jwt();
