/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2023/2/20
 *  @Name       :   operationLogLevel.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */
'use strict';

const Enum = require('enum');

/**
 *
 * @type {{INFO, WARN, ERROR}}
 */
module.exports = new Enum({
    INFO: 'info',
    WARN: 'warn',
    ERROR: 'error',
});
