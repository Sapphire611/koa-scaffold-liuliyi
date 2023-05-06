/**
 *  @Author     :   ruanchuhao
 *  @Date       :   2022/10/25
 *  @Name       :   auth.js
 *  @Content    :   ruanchuhao@shgbit.com
 *  @Desc       :
 */

'use strict';
const { User } = require('model');
const { authEnum } = require('misc').enum;
/**
 *
 * @param ctx
 * @param scope
 * @returns {boolean}
 */
const isAccess = async (ctx, scope) => {
    if (scope === authEnum.user.value) return !!ctx.state.userObjectId;
    if (scope === authEnum.admin.value) {
        const user = await User.findById(ctx.state.userObjectId).populate('role');
        return [authEnum.admin.value].includes(user?.role?.code) ?? false;
    }
    return !!ctx.state.userObjectId;
}

exports.isAccess = isAccess;

/**
 *
 * @param  [scopes]
 * @returns {function(*, *): Promise<*>}
 */
module.exports.needAuth = function (...scopes) {
    return async function (ctx, next) {
        if (0 === scopes.length) { scopes = [authEnum.user.value]; }

        for (const scope of scopes) {
            if (! await isAccess(ctx, scope)) {
                ctx.body = 'auth error';
                ctx.status = 401;
                return;
            }
        }
        return next();
    };
};
