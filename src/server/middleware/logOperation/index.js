/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2023/2/20
 *  @Name       :   index.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */
'use strict';

const { opLogLevelEnum, opLogTypeEnum } = require('misc/enum');
const OperationLogs = require('./operationLogs');
const OperatorDto = require('./operatorDto');

/**
 * 同步通讯录日志`
 * @return {OperatorDto|| {start:function,end:function, exception:function, error:function}}
 */
module.exports.syncDingTalk = () =>
    new OperatorDto({
        start: () => {
            return new OperationLogs({
                detailTemplate: '钉钉通讯录同步开始。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.SYNC_CONTACT,
            });
        },
        end: () => {
            return new OperationLogs({
                detailTemplate: '钉钉通讯录同步结束。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.SYNC_CONTACT,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '钉钉通讯录同步时，发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.SYNC_CONTACT,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '钉钉通讯录同步时，发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type: opLogTypeEnum.SYNC_CONTACT,
            });
        },
    });

/**
 * 上传批次 done
 * @return {OperatorDto|| {start:function,end:function, exception:function, error:function}}
 */
module.exports.uploadBatch = () =>
    new OperatorDto({
        start: () => {
            return new OperationLogs({
                detailTemplate: '${userName}上传PIN码为${pin}文件开始，共${fileCount}个文件，${fileSize}MB。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.UPLOAD_BATCH,
                temp: { fileCount: 0 },
            });
        },

        end: () => {
            return new OperationLogs({
                detailTemplate: '${userName}上传PIN码为${pin}文件结束。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.UPLOAD_BATCH,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '${userName}上传PIN码为${pin}文件时发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.UPLOAD_BATCH,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '${userName}上传PIN码为${pin}文件时发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type: opLogTypeEnum.UPLOAD_BATCH,
            });
        },
    });

/**
 * 下载批次 done
 * @return {OperatorDto|| {start:function, end:function, exception:function, error:function}}
 */
module.exports.downloadBatch = () =>
    new OperatorDto({
        start: () => {
            return new OperationLogs({
                detailTemplate: '${deviceName}下载PIN码为${pin}的文件开始。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.DOWNLOAD_BATCH,
            });
        },

        end: () => {
            return new OperationLogs({
                detailTemplate: '${deviceName}下载PIN码为${pin}的文件结束, 共${count}/${total}个文件，${size}MB。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.DOWNLOAD_BATCH,
            });
        },
        retrySuccess: () => {
            return new OperationLogs({
                detailTemplate: '${deviceName}重试下载PIN码为${pin}文件${fileName}成功, 文件大小${size}MB。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.DOWNLOAD_BATCH,
            });
        },
        retryFail: () => {
            return new OperationLogs({
                detailTemplate: '${deviceName}重试下载PIN码为${pin}文件${fileName}失败。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.DOWNLOAD_BATCH,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '${deviceName}下载PIN码为${pin}文件时发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.DOWNLOAD_BATCH,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '${deviceName}下载PIN码为${pin}文件时发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type: opLogTypeEnum.DOWNLOAD_BATCH,
            });
        },
    });

/**
 * 批次删除 done
 * @return {OperatorDto|| {start:function, exception:function, error:function}}
 */
module.exports.deleteBatch = () =>
    new OperatorDto({
        start: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}删除了PIN码为${pin}的上传批次。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.DELETE_BATCH,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}删除了PIN码为${pin}的上传批次时发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.DELETE_BATCH,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}删除了PIN码为${pin}的上传批次时发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type: opLogTypeEnum.DELETE_BATCH,
            });
        },
    });

/**
 * 系统授权 done
 * @return {OperatorDto || {register:function, unRegister:function, outOfDate:function, exception:function, error:function}}
 */
module.exports.licenseLog = () =>
    new OperatorDto({
        register: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}对系统进行了授权，授权成功。授权信息：设备数${deviceCount} 过期时间${expiredAt}。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.LICENSE,
            });
        },
        unRegister: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}对系统进行了授权注销，注销成功。注销授权信息：设备数${deviceCount} 过期时间${expiredAt}。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.LICENSE,
            });
        },
        outOfDate: () => {
            return new OperationLogs({
                detailTemplate: '系统授权已经到期，请尽快重新授权。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.LICENSE,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}对系统进行了${operateType}，发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.LICENSE,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}对系统进行了${operateType}，发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type: opLogTypeEnum.LICENSE,
            });
        },
    });

/**
 * 用户登录 done
 * @return {OperatorDto || {start:function, exception:function, error:function}}
 */
module.exports.userLogin = () =>
    new OperatorDto({
        start: () => {
            return new OperationLogs({
                detailTemplate: '${userName}登录了系统。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.USER_LOGIN,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '${userName}登录系统时发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.USER_LOGIN,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '${userName}登录系统时发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type: opLogTypeEnum.USER_LOGIN,
            });
        },
    });

/**
 * 管理员登录
 * @return {OperatorDto || {start:function, exception:function, error:function}}
 */
module.exports.adminLogin = () =>
    new OperatorDto({
        start: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}登录了系统。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.ADMIN_LOGIN,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}登录系统时发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.ADMIN_LOGIN,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}登录系统时发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type: opLogTypeEnum.ADMIN_LOGIN,
            });
        },
    });

/**
 * 设备注册 done
 * @return {OperatorDto|| {start:function, edit:function, delete:function, exception:function, error:function}}
 */
module.exports.deviceRegister = () =>
    new OperatorDto({
        start: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}注册了序列号为${deviceUUID}设备，命名为${deviceName}。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.DEVICE_REGISTER,
            });
        },
        edit: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}编辑了序列号为${deviceUUID}设备信息,命名为${deviceName}。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.DEVICE_REGISTER,
            });
        },
        delete: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}删除了序列号为${deviceUUID}设备,该设备名称为：${deviceName}。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.DEVICE_REGISTER,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}对设备进行了${operateType} ${deviceUUID} ${deviceName}，发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.DEVICE_REGISTER,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}对设备进行了${operateType} ${deviceUUID} ${deviceName}，发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type: opLogTypeEnum.DEVICE_REGISTER,
            });
        },
    });

/**
 * 系统配置
 * @return {OperatorDto ||{setBing:function, setCustom:function, uploadImage:function, deleteImage:function, openRegister:function, editSyncInfo:function, exception:function, error:function}}
 */
module.exports.systemConfig = () =>
    new OperatorDto({
        // 背景设置为Bing
        setBing: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}${operateType}了从Bing获取背景图片功能。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.SYSTEM_CONFIG,
            });
        },
        // 背景设置为自定义
        setCustom: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}${operateType}了自定义背景图片功能。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.SYSTEM_CONFIG,
            });
        },
        // 自定义背景上传图片
        uploadImage: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}上传了一张名为${imageName}图片。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.SYSTEM_CONFIG,
            });
        },
        // 自定义背景删除图片
        deleteImage: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}删除了一张名为${imageName}图片。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.SYSTEM_CONFIG,
            });
        },
        // 开放注册
        openRegister: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}${operateType}了开放注册功能。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.SYSTEM_CONFIG,
            });
        },
        // 组织架构同步信息编辑
        editSyncInfo: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}编辑了从钉钉组织架构同步信息。',
                level: opLogLevelEnum.INFO,
                type: opLogTypeEnum.SYSTEM_CONFIG,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}在进行${operateType}时发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type: opLogTypeEnum.SYSTEM_CONFIG,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '${adminName}在进行${operateType}时发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type: opLogTypeEnum.SYSTEM_CONFIG,
            });
        },
    });

// 系统cronJob
module.exports.systemCronJob = type =>
    new OperatorDto({
        start: () => {
            return new OperationLogs({
                detailTemplate: '${cronJobName}开始${afterMsg}。',
                level: opLogLevelEnum.INFO,
                type,
            });
        },
        stop: () => {
            return new OperationLogs({
                detailTemplate: '${cronJobName}结束${afterMsg}。',
                level: opLogLevelEnum.INFO,
                type,
            });
        },
        exception: () => {
            return new OperationLogs({
                detailTemplate: '在${cronJobName}时发生了${exception}。',
                level: opLogLevelEnum.WARN,
                type,
            });
        },
        error: () => {
            return new OperationLogs({
                detailTemplate: '在${cronJobName}时发生了${error}。',
                level: opLogLevelEnum.ERROR,
                type,
            });
        },
    });
