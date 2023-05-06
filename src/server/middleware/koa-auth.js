const { logger, jwt } = require('infra');
const { authService } = require('service');

module.exports.auth = function () {
    return async function (ctx, next) {
        const token = ctx.header.authorization ? ctx.header.authorization.split(' ')[1] : undefined;
        try {
            if (token && !jwt.isExp(token)) {
                ctx.state = authService.getDecode(token);
            } else {
                ctx.state = {};
            }
        } catch (e) {
            ctx.state = {};
        }

        logger.info(`[Token] path [${ctx.request.path}] token [${token}] state [${JSON.stringify(ctx.state)}]`);
        return next();
    };
};
