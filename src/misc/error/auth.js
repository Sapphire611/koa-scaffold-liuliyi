/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/10/8
 *  @Name       :   auth.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

'use strict';
const { ServiceError } = require('middleware/errorHandler');

class AuthErrors {
    constructor() {
        this.phoneError = ServiceError(10001, '请输入正确的手机号', '手机号不合法');

        this.smsCodeSendError = ServiceError(10002, '验证码发送失败', '验证码发送失败');
        this.phoneIn60sSetRedisError = ServiceError(10002, '验证码发送失败', 'redis设置重试时间操作失败');
        this.phoneVerifyCodeSetRedisError = ServiceError(10002, '验证码发送失败', 'redis赋值失败');
        this.smsCountLimitError = ServiceError(10002, '该手机号已达到24小时内短信次数上限', '验证码发送失败');

        this.smsCodeError = ServiceError(10003, '无效的验证码', '验证码输入有误');

        this.loginError = ServiceError(10004, undefined, '登录失败');
        this.loginTokenSetError = ServiceError(10004, undefined, '用户登录token塞入Redis失败，登录失败');
        this.needTokenError = ServiceError(10005, undefined, '用户在需要鉴权页面未鉴权登录');

        // 新人员类型错误
        this.userNameError = ServiceError(10006, '请输入正确的姓名', '姓名不合法');
        this.userDeptError = ServiceError(10007, '请输入正确的部门', '部门不合法');
        this.userRegionCodeError = ServiceError(10008, '请输入正确的区号', '区号不合法');

        // 用户已经存在
        this.userExistError = ServiceError(10009, '该用户已存在', '该用户已存在');
        // 用户不存在无法编辑
        this.userNotExistError = ServiceError(10010, '该用户不存在', '该用户不存在');
        // 用户来源原因无法编辑
        this.userSourceError = ServiceError(10011, '该用户来源无法编辑', '该用户来源无法编辑');
        // 用户更新失败
        this.userUpdateError = ServiceError(10012, '用户更新失败', '用户更新失败');
        // 用户导入信息格式错误
        this.userImportError = ServiceError(10013, '用户导入信息格式错误', '用户导入信息格式错误');

        // 钉钉配置未配置
        this.dingTalkConfigError = ServiceError(10014, '钉钉配置未配置', '钉钉配置未配置');

        // 钉钉获取accessToken失败
        this.dingTalkUserAccessTokenError = ServiceError(10015, '钉钉获取accessToken失败', '钉钉获取accessToken失败');

        // 钉钉获取用户信息失败
        this.dingTalkUserInfoError = ServiceError(10016, '钉钉获取用户信息失败', '钉钉获取用户信息失败');

        // 钉钉用户不存在
        this.dingTalkUserNotExistError = ServiceError(10017, '钉钉用户不存在', '钉钉用户不存在');

        // 不允许自动注册
        this.autoSignUpForbidden = ServiceError(10018, '不允许自动注册', '不允许自动注册');

        // 获取钉钉AccessToken失败
        this.dingTalkAppAccessTokenError = ServiceError(10019, '获取钉钉AccessToken失败', '获取钉钉AccessToken失败');

        // 获取钉钉用户Id失败
        this.dingTalkUserIdError = ServiceError(10020, '获取钉钉用户Id失败', '获取钉钉用户Id失败');

        // 钉钉获取列表信息报错
        this.dingTalkUserListError = ServiceError(10021, '钉钉获取列表信息报错', '钉钉获取列表信息报错');

        // 用户被禁用
        this.userDisabledError = ServiceError(10022, '用户被禁用', '用户被禁用');

        // 导入用户超过一万条
        this.importUserError = ServiceError(10023, '导入用户超过一万条', '导入用户失败');
    }

}

module.exports = new AuthErrors();
