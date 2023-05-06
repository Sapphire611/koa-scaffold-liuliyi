/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2023/2/20
 *  @Name       :   operationLogs.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :   日志模板
 */
"use strict";
const operator = require("./operator");
const { opLogLevelEnum } = require("./index");
const _ = require("lodash");
const moment = require("moment");

//** 日志模板 */
class OperationLogs {
  /**
   * 构造日志模板
   * @param detailTemplate 详情模板
   * @param level 日志级别
   * @param type operationLogTypeEnum
   * @param userId 操作用户id
   * @param temp 默认值模版
   * @param operatorName
   */
  constructor({ detailTemplate, level, type, userId, temp, operatorName }) {
    this.detailTemplate = detailTemplate;
    this.temp = temp || {};
    this.setTempDefaultValues(); // 设置默认模版变量为unknown
    this.level = level || opLogLevelEnum.INFO;
    this.type = type; // operationLogTypeEnum
    this.userId = userId || "unknown";
    this.time = moment().unix();
    this.sended = false;
    this.operatorName = (operatorName || "<未知用户>");
  }

  /**
   * (异步)发送日志
   */
  send() {
    if (this.sended) return;
    this.sended = true;
    // 以下内容可能包含无法完整获取的内容：{原始信息}

    operator.write({
      detail: this.detail,
      level: this.level,
      type: this.type,
      userName: this.operatorName || "<未知用户>",
      time: this.time
    });
  }

  /**
   * 设置操作用户
   * @param operatorName 操作者名称
   * @returns {OperationLogs}
   */
  setOperatorName(operatorName) {
    this.operatorName = operatorName;
    return this;
  }

  /**
   * 设置模版拼接
   * @param {Object} template 模版入参
   * @returns {OperationLogs}
   */
  setTemplate(template) {
    template = Object.assign({}, this.temp, template);
    this.detail = _.template(this.detailTemplate)(template);
    // 在原始数据中包含unknown时，添加提示给用户
    if (Object.values(template).includes("unknown")) {
      this.detail = this.detail + "（unknown表示未获取到的信息）";
    }
    return this;
  }

  /**
   * 设置模版拼接的临时变量为unknown
   */
  setTempDefaultValues() {
    const match = this.detailTemplate.match(/\${([^}]{0,30})}/g);
    if (match) {
      match.map(e => e.slice(2, -1)).forEach(e => (!this.temp[e] ? (this.temp[e] = "unknown") : undefined));
    }
  }

  /**
   * (异步)设置模版拼接并发送
   * @param {Object} template 模版入参
   * @param [operatorName] 用户名/设备名/管理员名
   * @returns {OperationLogs}
   */
  setTempAndSend(template, operatorName) {
    this.setTemplate(template);
    if (operatorName) this.setOperatorName(operatorName);
    this.send();
    return this;
  }
}

module.exports = OperationLogs;
