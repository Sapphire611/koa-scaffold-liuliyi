/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2023/2/28
 *  @Name       :   operatorDto.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */
"use strict";

class OperatorDto {
 /**
  * @return {OperatorDto||functionDict}
  */
 constructor(functionDict) {
  this.operatorName = undefined;
  this.temp = {};

  // 代理函数
  Object.keys(functionDict).forEach((key) => {
   this[key] = (temp) => {
    const res = functionDict[key](); // 生成日志Logger
    if(this.operatorName){res.setOperatorName(this.operatorName);} // 设置操作用户
    return res.setTempAndSend(
      Object.assign({},this.temp||{},temp||{}),
      this.operatorName); // 设置模版拼接的临时变量
   };
  });
 }

 /**
  * 设置模版拼接的临时变量
  * @param {[[string,string]], Object} key
  * @param {string}[value]
  * @returns {OperatorDto}
  */
 setTemp(key, value) {
  if(key instanceof Array){
   /*
       key: [
           ['key1', 'value1'],
           ['key2', 'value2'], ....
       ], value: undefined
    */
   key.forEach(item => {
    this.temp[item[0]] = item[1];
   });
  }else if(!value){
   /*
       key: {
           key1: 'value1',
           key2: 'value2', ....
       }, value: undefined
    */
   Object.keys(key).forEach((item) => {
    this.temp[item] = key[item];
   });
  }
  else {
   this.temp[key] = value;

  }
  return this;
 }

 /**
  * 设置模版拼接的临时变量[别名]
  * @param {[[string,string]], Object} key
  * @param {string}[value]
  * @returns {OperatorDto}
  */
 set(key, value) {this.setTemp(key, value); return this;}


 /**
  * 设置操作用户
  * @param operatorName 操作者名称
  * @returns {OperatorDto}
  */
 setOperatorName(operatorName){
  this.operatorName = operatorName || 'unknown';
  return this;
 }

}
module.exports = OperatorDto;
