const Router = require('koa-router');
const router = new Router({ prefix: '/api/v1' });
const { formResponse } = require('middleware/reqBody');
const { name, version } = require('../../../../package.json');
const { User } = require('model');
const { authService } = require('service');
router.use(formResponse());

router.get('/', async ctx => {
    ctx.body = `${name} works! start at ${new Date()} Version: ${version}`;
    ctx.status = 200;
});

// 模拟登录
router.post('/admin/login', async ctx => {
    const { name, password } = ctx.request.body;
    const user = await User.findOne({ name, password });
    if (!!user) ctx.body = authService.getToken({ userObjectId: user._id });
    ctx.status = 200;
});

module.exports = router;
