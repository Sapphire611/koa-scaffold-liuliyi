const assert = require('assert');
const { createUser } = require('./common');
const App = require('../../src/App');

describe('basic common methods Test', () => {
    let user; //

    before(async () => {
        await App.open();
        user = await createUser();
        console.log(user.token);
    });

    after(async () => {
        await App.close()
    });

    it('[get] /todo', async () => {
        // something 4 test
    });
});
