"use strict";
// FileName: UserController.ts
// ProjectName: express-typescript
// 作者：区区电脑
// createTime: 2019/4/23
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
const common_1 = require("../common/common");
const User_1 = require("../models/User");
class UserController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /**
     * 校验用户权限
     * @param token
     */
    _userCheckAuth(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield common_1.Token.check(token);
            if (result.data) {
                let id = result.data.id;
                // 链接数据库
                let con = yield this._connectionOpen();
                if (!con) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '数据库连接失败';
                    return this.jsonResponse;
                }
                // 查询用户是否存在
                let user = yield User_1.User.findOne({ id: id });
                if (!user) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '用户不存在';
                    return this.jsonResponse;
                }
                if (user.admin == 0) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '您没有该权限';
                    return this.jsonResponse;
                }
                else {
                    this.jsonResponse = new common_1.JsonResponseSuccess();
                    this.jsonResponse.message = '该用户权限校验成功';
                    return this.jsonResponse;
                }
            }
            else {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '无效的token';
                return this.jsonResponse;
            }
        });
    }
    /**
     * 获取登录用户
     * @param token
     */
    getLoginUser(token) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield common_1.Token.check(token);
            if (result.data) {
                let id = result.data.id;
                // 链接数据库
                let con = yield this._connectionOpen();
                if (!con) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '数据库连接失败';
                    return this.jsonResponse;
                }
                // 查询用户是否存在
                let user = yield User_1.User.findOne({ id: id });
                if (!user) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '用户不存在';
                    return this.jsonResponse;
                }
                this.jsonResponse = new common_1.JsonResponseSuccess();
                this.jsonResponse.message = '登录用户查询成功';
                this.jsonResponse.data = user;
                return this.jsonResponse;
            }
            else {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '无效的token';
                return this.jsonResponse;
            }
        });
    }
    /**
     * 用户注册
     * @param params
     */
    userRegister(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.account && params.password) {
                // 链接数据库
                let con = yield this._connectionOpen();
                if (!con) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '数据库连接失败';
                    return this.jsonResponse;
                }
                // 查询用户是否存在
                let user = yield User_1.User.findOne({ account: params.account });
                if (user) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '用户已存在';
                    return this.jsonResponse;
                }
                else {
                    // 创建新用户
                    let newUser = new User_1.User();
                    let _this = this;
                    newUser.account = params.account;
                    newUser.password = common_1.Md5(params.password);
                    newUser.admin = 0;
                    // 新用户保存到数据库
                    let resUser = yield con.manager.save(newUser);
                    if (resUser) {
                        this.jsonResponse = new common_1.JsonResponseSuccess();
                        this.jsonResponse.message = '注册成功';
                        this.jsonResponse.data = resUser;
                        return this.jsonResponse;
                    }
                    else {
                        this.jsonResponse = new common_1.JsonResponseError();
                        this.jsonResponse.message = '注册失败';
                        return this.jsonResponse;
                    }
                }
            }
            else {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '请补全信息';
                return this.jsonResponse;
            }
        });
    }
    /**
     * 用户登录
     * @param params
     */
    userLogin(params) {
        return __awaiter(this, void 0, void 0, function* () {
            if (params.account && params.password) {
                // 链接数据库
                let con = yield this._connectionOpen();
                if (!con) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '数据库连接失败';
                    return this.jsonResponse;
                }
                // 查询用户
                let user = yield User_1.User.findOne({ account: params.account });
                if (!user) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '用户不存在';
                    return this.jsonResponse;
                }
                else {
                    // 校验登录密码
                    if (user.password !== common_1.Md5(params.password)) {
                        this.jsonResponse = new common_1.JsonResponseError();
                        this.jsonResponse.message = '密码错误';
                        return this.jsonResponse;
                    }
                    else {
                        // 登录成功
                        let token = common_1.Token.create({
                            account: user.account,
                            id: user.id
                        });
                        user.token = token;
                        this.jsonResponse = new common_1.JsonResponseSuccess();
                        this.jsonResponse.data = user;
                        this.jsonResponse.message = '登录成功';
                        return this.jsonResponse;
                    }
                }
            }
            else {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '请补全信息';
                return this.jsonResponse;
            }
        });
    }
    /**
     * 查询用户列表
     * @param params
     */
    userGetAll(params) {
        return __awaiter(this, void 0, void 0, function* () {
            // 链接数据库
            let con = yield this._connectionOpen();
            if (!con) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            let type = params.type;
            if (type == '0') {
                // 查询所有用户
                let users = yield User_1.User.find();
                this.jsonResponse = new common_1.JsonResponseSuccess();
                this.jsonResponse.message = '查询成功';
                this.jsonResponse.data = users;
                return this.jsonResponse;
            }
            else if (type == '1') {
                // 查询后台管理员用户
                let users = yield User_1.User.find({ admin: 1 });
                this.jsonResponse = new common_1.JsonResponseSuccess();
                this.jsonResponse.message = '查询成功';
                this.jsonResponse.data = users;
                return this.jsonResponse;
            }
            else if (type == '2') {
                // 查询普通用户
                let users = yield User_1.User.find({ admin: 0 });
                this.jsonResponse = new common_1.JsonResponseSuccess();
                this.jsonResponse.message = '查询成功';
                this.jsonResponse.data = users;
                return this.jsonResponse;
            }
            else {
                // 查询所有用户
                let users = yield User_1.User.find();
                this.jsonResponse = new common_1.JsonResponseSuccess();
                this.jsonResponse.message = '查询成功';
                this.jsonResponse.data = users;
                return this.jsonResponse;
            }
        });
    }
    /**
     * 修改用户管理员信息
     * @param req
     */
    setUserManager(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // 链接数据库
            let con = yield this._connectionOpen();
            if (!con) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            if (req.body.id == 1) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '不允许修改超级管理员的管理权限';
                return this.jsonResponse;
            }
            // 校验用户权限
            let token = req.headers.token;
            let userAuth = yield this._userCheckAuth(token);
            if (userAuth.code != common_1.JsonResponseStatusCode.code_000) {
                return userAuth;
            }
            let params = req.body;
            let user = yield User_1.User.findOne({ id: params.id });
            if (!user) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '用户不存在';
                return this.jsonResponse;
            }
            user.admin = params.admin;
            let result = yield User_1.User.save(user);
            if (!result) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '修改失败';
                return this.jsonResponse;
            }
            this.jsonResponse = new common_1.JsonResponseSuccess();
            this.jsonResponse.message = '修改成功';
            this.jsonResponse.data = result;
            return this.jsonResponse;
        });
    }
    /**
     * 获取个人信息
     * @param req
     */
    getMyInfo(req) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.headers.token;
            let result = yield common_1.Token.check(token);
            if (result.data) {
                let id = result.data.id;
                // 链接数据库
                let con = yield this._connectionOpen();
                if (!con) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '数据库连接失败';
                    return this.jsonResponse;
                }
                let user = yield User_1.User.findOne({ id: id });
                if (!user) {
                    this.jsonResponse = new common_1.JsonResponseError();
                    this.jsonResponse.message = '用户不存在';
                    return this.jsonResponse;
                }
                this.jsonResponse = new common_1.JsonResponseSuccess();
                this.jsonResponse.message = '查询成功';
                this.jsonResponse.data = user;
                return this.jsonResponse;
            }
            else {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '无效的token';
                return this.jsonResponse;
            }
        });
    }
    /**
     * 修改个人信息
     * @param req
     */
    setMyInfo(req) {
        return __awaiter(this, void 0, void 0, function* () {
            // 链接数据库
            let con = yield this._connectionOpen();
            if (!con) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            // 校验用户权限
            let token = req.headers.token;
            let params = req.body;
            let res = yield this.getLoginUser(token);
            if (!res.data) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '用户不存在';
                return this.jsonResponse;
            }
            let user = res.data;
            user.nickname = params.nickname;
            user.avatar = params.avatar;
            let result = yield User_1.User.save(user);
            if (!result) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '修改失败';
                return this.jsonResponse;
            }
            this.jsonResponse = new common_1.JsonResponseSuccess();
            this.jsonResponse.message = '修改成功';
            this.jsonResponse.data = result;
            return this.jsonResponse;
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map