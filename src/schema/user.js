/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/9/26
 *  @Name       :   auth.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

'use strict';
const Joi = require('joi');
const { authErrors } = require('misc/error');
const { objectId } = require('./common');
const { regionCode } = require('schema/common');

// 获取验证码 GET /oauth/smscode
const baseUserInfo = {
    regionCode,
    mobileNumber: Joi.string()
        .required()
        .trim()
        .pattern(new RegExp(/\d{1,20}/))
        .error(() => {
            authErrors.phoneError().throw();
        }),
    language: Joi.string().default('zh'),
};

module.exports.userMobile = {
    body: Joi.object()
        .keys({
            sendSms: Joi.boolean().default(true),
            ...baseUserInfo,
        })
        .required(),
};

// 登录 GET /oauth/login
const baseLoginInfo = {
    verificationCode: Joi.string().required(),
    ...baseUserInfo,
};
exports.login = {
    body: Joi.object()
        .keys({ regionCode, ...baseLoginInfo })
        .required(),
};

// 创建用户 POST /users 新规则下的用户
const baseUserInfoNew = {
    name: Joi.string()
        .required()
        .min(1)
        .max(50)
        .error(() => {
            authErrors.userNameError().throw();
        }),
    dept: Joi.string()
        .min(0)
        .default('')
        .trim()
        .max(50)
        .error(() => {
            authErrors.userDeptError().throw();
        }),
    mobile: Joi.string()
        .trim()
        .regex(new RegExp(/^\d{1,20}$/))
        .required()
        .trim()
        .error(() => {
            authErrors.phoneError().throw();
        }),
    regionCode: Joi.string()
        .required()
        .trim()
        .regex(new RegExp(/^\s*\+\d+\s*$/))
        .min(1)
        .max(20)
        .error(() => {
            authErrors.userRegionCodeError().throw();
        }),
};

exports.baseUserInfoNew = baseUserInfoNew;

exports.createUser = {
    body: Joi.object()
        .keys({
            regionCode,
            ...baseUserInfoNew,
        })
        .required(),
};
exports.editUser = {
    body: Joi.object()
        .keys({
            name: Joi.string()
                .required()
                .min(1)
                .max(100)
                .error(() => {
                    authErrors.userNameError().throw();
                }),
            dept: Joi.string()
                .min(0)
                .default('')
                .max(50)
                .error(() => {
                    authErrors.userDeptError().throw();
                }),
        })
        .required(),
    params: Joi.object().keys({
        id: objectId.required(),
    }),
};

// [Delete] /users/:id 删除用户
exports.deleteUser = {
    params: Joi.object().keys({
        id: objectId.required(),
    }),
};

// [GET] /users 获取用户列表
exports.getUserList = {
    query: Joi.object().keys({
        page: Joi.number().default(1).min(1),
        size: Joi.number().default(100).min(1).max(100),
        source: Joi.string()
            .min(0)
            .trim()
            .max(100)
            .error(() => {
                authErrors.userDeptError().throw();
            }),
        key: Joi.string()
            .trim()
            .min(1)
            .max(100)
            .error(() => {
                authErrors.userNameError().throw();
            }),
    }),
};

// [GET] /users/:id 获取用户详情
exports.getUserDetail = {
    params: Joi.object().keys({
        id: objectId.required(),
    }),
};

// 模板
exports.baseUserInfoNew = Joi.object().keys(baseUserInfoNew).required();

// [POST] /users/:id/enable 是否启用账户
exports.enableUser = {
    params: Joi.object().keys({
        id: objectId.required(),
    }),
    body: Joi.object().keys({
        state: Joi.string().valid('normal', 'disable').required(),
    }),
};
