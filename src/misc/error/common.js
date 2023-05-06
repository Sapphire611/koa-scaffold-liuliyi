/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/10/13
 *  @Name       :   common.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

'use strict';
const { ServiceError } = require('middleware/errorHandler');

class CommonErrors {
    constructor() {
        this.databaseInitError = ServiceError();
        // 手机区号错误
        this.regionCodeError = ServiceError('00001', '手机区号错误', '手机区号错误');
    }
}

module.exports = new CommonErrors();
