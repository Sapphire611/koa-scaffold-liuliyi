const assert = require('assert');
const config = require('config');
const { appStart, appShutDown, createUser, createAdminUser, request } = require('../tools/common');
const md5 = require('md5');

describe('test init admin login', () => {
    before(async () => {
        await appStart();
    });

    after(async () => {
        await appShutDown();
    });

    it('[get] /corpId', async () => {
        const result = await request.post(`/v1/admin/login`, { name: 'admin', password: md5('admin') });
        assert.equal(result.code, 0);
    });
});
