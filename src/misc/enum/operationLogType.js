/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2023/2/20
 *  @Name       :   operationLogType.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */
'use strict';

const Enum = require('enum');

/**
 *
 * @type {{SYNC_CONTACT, UPLOAD_BATCH, DOWNLOAD_BATCH, DELETE_BATCH, SYSTEM_AUTH, USER_LOGIN, ADMIN_LOGIN, DEVICE_REGISTER, SYSTEM_CONFIG}}
 */
module.exports = new Enum({
    SYNC_CONTACT: '同步通讯录', // 同步通讯录
    UPLOAD_BATCH: '上传批次', // 上传批次
    DOWNLOAD_BATCH: '下载批次', // 下载批次
    DELETE_BATCH: '批次删除', // 批次删除
    LICENSE: '系统授权', // 系统授权
    USER_LOGIN: '用户登录', // 用户登录
    ADMIN_LOGIN: '管理员登录', // 管理员登录
    DEVICE_REGISTER: '设备注册', // 设备注册
    SYSTEM_CONFIG: '系统配置', // 系统配置
    SYSTEM_CRONJOB: '系统定时任务', // 系统定时任务
    BACKGROUND_IMAGE_SYNC: "同步背景图片", // 同步背景图片
    STATISTICS_SYNC: "同步统计数据", // 同步统计数据
    LICENSE_SYNC: "检查许可证", // 检查许可证
    FILE_DELETE: "删除过期文件", // 删除过期文件
});
