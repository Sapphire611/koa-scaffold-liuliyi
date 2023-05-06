'use strict';

const { mongoose } = require('infra').mongodb;
const { Schema } = mongoose;
// const { ObjectId } = Schema.Types;

const roleSchema = new Schema({
    name: { type: String, require: true }, // 公司名称
    code: { type: String, require: true }, // 唯一英文编码
    authorities: { type: [String] }, // logo 图片地址
});

module.exports = mongoose.model('Role', roleSchema, 'roles');
