/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/10/25
 *  @Name       :   common.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

'use strict';
const Joi = require('joi');
const mongoose = require('mongoose');
const { areaCode } = require('config');
const { commonErrors } = require("misc/error");

/**
 * 识别并转换为 mongoose 的ObjectId
 * @type {Joi.Schema}
 */
exports.objectId = Joi.custom((value, helpers) => {
    if ('string' === typeof value) {
        const validatePattern = Joi.string()
            .required()
            .trim()
            .lowercase()
            .pattern(/[0-9a-f]{24}/)
            .error(new Error('Invalid Object Id '));
        const validateResult = validatePattern.validate(value);
        if (validateResult.error) {
            return helpers.error('any.invalid');
        }
        return new mongoose.mongo.ObjectId(value);
    } else {
        if (!mongoose.mongo.ObjectId.isValid(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }
});

exports.uuidv4 = Joi.string().length(36).required();

exports.pageable = {
    page: Joi.number().min(1).default(1),
    size: Joi.number().min(1).max(100).default(20),
};


exports.mobile = Joi.string().length(11);

exports.md5 = Joi.string().hex().length(32);

exports.regionCode = Joi.string().valid(...areaCode).default('+86').error(err => commonErrors.regionCodeError(err.toString()).throw());