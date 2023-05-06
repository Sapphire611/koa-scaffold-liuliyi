'use strict';

const { mongoose } = require('infra').mongodb;
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema({
    //  dingTalk:钉钉导入  manual:管理员手动创建  external:导入, register: 外部注册
    source: { type: String, require: true, enum: ['dingTalk', 'manual', 'external', 'register'], index: true, default: 'register' }, // 用户来源
    dingTalkId: { type: String, index: true }, // 钉钉用户ID
    name: { type: String, require: true, index: true }, // 用户姓名
    dept: { type: String }, // 用户部门
    regionCode: { type: String, require: true, default: '+86' }, // 用户区域编码,默认+86
    mobile: { type: String, require: true, index: true }, // 手机号
    state: { type: String, require: true, enum: ['normal', 'disable'], default: 'normal' }, // 用户状态
    role: { type: ObjectId, ref: 'Role', index: true }, // 用户角色
    password: { type: String }, // 仅用于后门账户登录，正常用户不可能有这个属性
});

module.exports = mongoose.model('User', UserSchema, 'users');
