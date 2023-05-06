/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2023/3/3
 *  @Name       :   systemLog.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */
'use strict';
const Joi = require('joi');
const { opLogTypeEnum, opLogLevelEnum } = require('misc/enum');

exports.search = {
    query: Joi.object().keys({
        begin: Joi.number().required(),
        end: Joi.number().required(),
        level: Joi.string().valid(...opLogLevelEnum.enums.map(e => e.key)),
        type: Joi.string().valid(...opLogTypeEnum.enums.map(e => e.key)),
        key: Joi.string(),
        page: Joi.number().default(1).min(1),
        size: Joi.number().default(100).min(1).max(100),
    }),
};
