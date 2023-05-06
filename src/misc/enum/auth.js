/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/11/24
 *  @Name       :   auth.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

'use strict';

const Enum = require('enum');

/**
 * dingTalk:钉钉导入  manual:管理员手动创建  external:导入, register: 外部注册
 * @type {{user, device, admin}}
 */
module.exports = new Enum({
    user: 'user',
    device: 'device',
    admin: 'admin',
    board: 'board',
    dingTalk: 'dingTalk',
    manual: 'manual',
    external: 'external',
    register: 'register',
});


