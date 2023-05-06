/**
 * @author: Sapphire Liu
 * @description: 测试相关通用方法封装
 */

const { redisService, mongodb } = require('infra');
const { webServer } = require('server');

const { Building, Device, User, Role, Room } = require('model');
const allModels = require('model');
const { authService } = require('service');
const axios = require('axios');
const config = require('config');
const App = require('../../src/App');
//
exports.appStart = async () => {
    // await App.open();

    // 1. 分别开启需要的数据库 和 webserver
    await mongodb.open();
    await redisService.open();
    await webServer.open();

    // 2. clear all <test data> in test Database
    for (const each of Object.keys(allModels)) {
        await allModels[each].deleteMany({});
    }

    await App.tryInitDatabase();
};

// end
exports.appShutDown = async () => {
    // await App.close();

    await mongodb.close();
    await redisService.close();
    await webServer.close();
};

// 返回随机n位数字后缀
const randomNumberSuffix = n => {
    return Math.floor(Math.random() * Math.pow(10, n));
};

exports.randomNumberSuffix = randomNumberSuffix;

// 随机生成一个用户，并附加token返回
exports.createUser = async () => {
    let user = await User.create({
        source: 'manual',
        dingTalkId: 'test',
        name: 'testUser' + randomNumberSuffix(3),
        mobile: '138' + randomNumberSuffix(8),
        comment: new Date().toString(),
    });

    return { ...user._doc, token: authService.getToken({ userObjectId: user._id }) };
};

// exports.createBoardUser = async () => {
//     const boardRole = await Role.findOne({ code: 'board' });

//     let user = await User.create({
//         source: 'manual',
//         dingTalkId: 'test',
//         name: 'testBoardUser' + randomNumberSuffix(3),
//         mobile: '138' + randomNumberSuffix(8),
//         comment: new Date().toString(),
//         role: boardRole._id,
//     });

//     return { ...user._doc, token: authService.getToken({ userObjectId: user._id }) };
// };

exports.createAdminUser = async () => {
    const adminRole = await Role.findOne({ code: 'admin' });

    let user = await User.create({
        source: 'manual',
        dingTalkId: 'test',
        name: 'testAdminUser' + randomNumberSuffix(3),
        mobile: '138' + randomNumberSuffix(8),
        comment: new Date().toString(),
        role: adminRole._id,
    });

    return { ...user._doc, token: authService.getToken({ userObjectId: user._id }) };
};

// 创建一个测试用company
// exports.createCompany = async () => {
//     const company = await Company.create({
//         name: 'test4CreateCompany' + randomNumberSuffix(3),
//         code: 'test' + randomNumberSuffix(3),
//         dingTalk: {
//             corpId: 'testCorpId',
//         },
//     });

//     return company;
// };

// 创建一个测试用Building
exports.createBuilding = async company => {
    const building = await Building.create({
        name: 'test4CreateBuilding' + randomNumberSuffix(3),
        code: 'testBuilding' + randomNumberSuffix(3),
        district: 'testDistrict' + randomNumberSuffix(3),
        floors: ['-18F'],
        des: new Date(),
    });

    return building;
};

// 创建一个测试用Room
exports.createRoom = async building => {
    const room = await Room.create({
        building: building._id,
        name: 'test4CreateBuilding' + randomNumberSuffix(3),
        code: 'testRoom' + randomNumberSuffix(3),
        capacity: 10,
        description: '...',
        des: new Date(),
    });

    return room._doc;
};

// 创建一个测试用Device
exports.createDevice = async () => {
    const device = await Device.create({
        name: 'test4CreateDevice' + randomNumberSuffix(3),
        code: 'testDevice' + randomNumberSuffix(3),
    });

    return device;
};

class Request {
    constructor() {
        this.baseURL = `http://localhost:${config.port}/api`;
        this.token = null;
    }

    loginAs(user) {
        this.token = user.token;
        return this;
    }

    authHeader(customHeaders) {
        return {
            headers: {
                Authorization: `Bearer ${this.token}`,
                ...customHeaders,
            },
        };
    }

    async get(url) {
        const response = await axios.get(`${this.baseURL}${url}`, this.authHeader());
        return response.data;
    }

    async post(url, requestBody, headers) {
        const response = await axios.post(`${this.baseURL}${url}`, requestBody, this.authHeader(headers));
        return response.data;
    }

    async patch(url, requestBody) {
        const response = await axios.patch(`${this.baseURL}${url}`, requestBody, this.authHeader());
        return response.data;
    }

    async delete(url) {
        const response = await axios.delete(`${this.baseURL}${url}`, this.authHeader());
        return response.data;
    }
}

exports.request = new Request();
