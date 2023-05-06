'use strict';

const { user_expire_time } = require('config');
const { authErrors } = require('misc/error');
const { jwt } = require('infra');
/**
 * 登录 验证码
 */
class AuthService {
    constructor() {}

    /**
     * 授权 token 生成token
     * @returns {string} token
     * @param payloads
     */
    getToken(payloads) {
        // 生成token
        const token = jwt.sign(payloads, { expiresIn: `${user_expire_time}day` });
        if (!token) {
            authErrors.loginTokenSetError('getToken failed').throw();
        }
        return token;
    }

    /**
     * 用token解析用户ID
     * @param {string} token
     * @returns {string}
     */
    getDecode(token) {
        return jwt.decode(token);
    }
}

module.exports = new AuthService();
