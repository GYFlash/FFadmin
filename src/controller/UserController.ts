// FileName: UserController.ts
// ProjectName: express-typescript
// 作者：区区电脑
// createTime: 2019/4/23

import {BaseController} from "./BaseController";
import {
    JsonResponse,
    JsonResponseError,
    JsonResponseStatusCode,
    JsonResponseSuccess,
    Md5,
    Token,
    TokenResult
} from "../common/common";
import {User} from "../models/User";
import {Connection} from "typeorm";

export class UserController extends BaseController{

    constructor () {
        super();
    }

    /**
     * 校验用户权限
     * @param token
     */
    private async _userCheckAuth(token:string):Promise<JsonResponse> {
        let result:TokenResult = await Token.check(token);
        if (result.data) {
            let id = result.data.id;
            // 链接数据库
            let con:Connection = await this._connectionOpen();
            if (!con) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            // 查询用户是否存在
            let user:User|undefined = await User.findOne({id: id});
            if (!user) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '用户不存在';
                return this.jsonResponse;
            }
            if (user.admin == 0) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '您没有该权限';
                return this.jsonResponse;
            } else {
                this.jsonResponse = new JsonResponseSuccess();
                this.jsonResponse.message = '该用户权限校验成功';
                return this.jsonResponse;
            }
        } else {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '无效的token';
            return this.jsonResponse;
        }
    }

    /**
     * 获取登录用户
     * @param token
     */
    public async getLoginUser(token:string):Promise<JsonResponse> {
        let result:TokenResult = await Token.check(token);
        if (result.data) {
            let id = result.data.id;
            // 链接数据库
            let con:Connection = await this._connectionOpen();
            if (!con) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            // 查询用户是否存在
            let user:User|undefined = await User.findOne({id: id});
            if (!user) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '用户不存在';
                return this.jsonResponse;
            }
            this.jsonResponse = new JsonResponseSuccess();
            this.jsonResponse.message = '登录用户查询成功';
            this.jsonResponse.data = user;
            return this.jsonResponse;
        } else {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '无效的token';
            return this.jsonResponse;
        }
    }

    /**
     * 用户注册
     * @param params
     */
    public async userRegister(params:any):Promise<JsonResponse> {
        if (params.account && params.password) {
            // 链接数据库
            let con:Connection = await this._connectionOpen();
            if (!con) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            // 查询用户是否存在
            let user:User|undefined = await User.findOne({account:params.account});
            if (user) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '用户已存在';
                return this.jsonResponse;
            } else {
                // 创建新用户
                let newUser:User = new User();
                let _this = this;
                newUser.account = params.account;
                newUser.password = Md5(params.password);
                newUser.admin = 0;
                // 新用户保存到数据库
                let resUser:User = await con.manager.save(newUser);
                if (resUser) {
                    this.jsonResponse = new JsonResponseSuccess();
                    this.jsonResponse.message = '注册成功';
                    this.jsonResponse.data = resUser;
                    return this.jsonResponse;
                } else {
                    this.jsonResponse = new JsonResponseError();
                    this.jsonResponse.message = '注册失败';
                    return this.jsonResponse;
                }
            }
        } else {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '请补全信息';
            return this.jsonResponse;
        }
    }

    /**
     * 用户登录
     * @param params
     */
    public async userLogin(params:any):Promise<JsonResponse> {
        if (params.account && params.password) {
            // 链接数据库
            let con:Connection = await this._connectionOpen();
            if (!con) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;

            }
            // 查询用户
            let user:User|undefined = await User.findOne({account: params.account});
            if (!user) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '用户不存在';
                return this.jsonResponse;
            } else {
                // 校验登录密码
                if (user.password !== Md5(params.password)) {
                    this.jsonResponse = new JsonResponseError();
                    this.jsonResponse.message = '密码错误';
                    return this.jsonResponse;
                } else {

                    // 登录成功
                    let token:string = Token.create({
                        account: user.account,
                        id: user.id
                    });
                    user.token = token;
                    this.jsonResponse = new JsonResponseSuccess();
                    this.jsonResponse.data = user;
                    this.jsonResponse.message = '登录成功';
                    return this.jsonResponse;
                }
            }
        } else {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '请补全信息';
            return this.jsonResponse;
        }
    }

    /**
     * 查询用户列表
     * @param params
     */
    public async userGetAll(params?:any):Promise<JsonResponse> {
        // 链接数据库
        let con:Connection = await this._connectionOpen();
        if (!con) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '数据库连接失败';
            return this.jsonResponse;
        }
        let type = params.type;
        if (type == '0') {
            // 查询所有用户
            let users = await User.find();
            this.jsonResponse = new JsonResponseSuccess();
            this.jsonResponse.message = '查询成功';
            this.jsonResponse.data = users;
            return this.jsonResponse;
        } else if (type == '1') {
            // 查询后台管理员用户
            let users = await User.find({admin: 1});
            this.jsonResponse = new JsonResponseSuccess();
            this.jsonResponse.message = '查询成功';
            this.jsonResponse.data = users;
            return this.jsonResponse;
        } else if (type == '2') {
            // 查询普通用户
            let users = await User.find({admin: 0});
            this.jsonResponse = new JsonResponseSuccess();
            this.jsonResponse.message = '查询成功';
            this.jsonResponse.data = users;
            return this.jsonResponse;
        } else {
            // 查询所有用户
            let users = await User.find();
            this.jsonResponse = new JsonResponseSuccess();
            this.jsonResponse.message = '查询成功';
            this.jsonResponse.data = users;
            return this.jsonResponse;
        }
    }

    /**
     * 修改用户管理员信息
     * @param req
     */
    public async setUserManager(req:any):Promise<JsonResponse> {
        // 链接数据库
        let con:Connection = await this._connectionOpen();
        if (!con) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '数据库连接失败';
            return this.jsonResponse;
        }
        if (req.body.id == 1) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '不允许修改超级管理员的管理权限';
            return this.jsonResponse;
        }
        // 校验用户权限
        let token = req.headers.token;
        let userAuth:JsonResponse = await this._userCheckAuth(token);
        if (userAuth.code != JsonResponseStatusCode.code_000) {
            return userAuth;
        }
        let params = req.body;
        let user:User|undefined = await User.findOne({id: params.id});
        if (!user) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '用户不存在';
            return this.jsonResponse;
        }
        user.admin = params.admin;
        let result = await User.save(user);
        if (!result) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '修改失败';
            return this.jsonResponse;
        }
        this.jsonResponse = new JsonResponseSuccess();
        this.jsonResponse.message = '修改成功';
        this.jsonResponse.data = result;
        return this.jsonResponse;
    }


    /**
     * 获取个人信息
     * @param req
     */
    public async getMyInfo(req:any):Promise<JsonResponse> {
        let token = req.headers.token;
        let result:TokenResult = await Token.check(token);
        if (result.data) {
            let id = result.data.id;
            // 链接数据库
            let con:Connection = await this._connectionOpen();
            if (!con) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            let user:User|undefined = await User.findOne({id: id});
            if (!user) {
                this.jsonResponse = new JsonResponseError();
                this.jsonResponse.message = '用户不存在';
                return this.jsonResponse;
            }
            this.jsonResponse = new JsonResponseSuccess();
            this.jsonResponse.message = '查询成功';
            this.jsonResponse.data = user;
            return this.jsonResponse;
        } else {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '无效的token';
            return this.jsonResponse;
        }
    }
    /**
     * 修改个人信息
     * @param req
     */
    public async setMyInfo(req:any):Promise<JsonResponse> {
        // 链接数据库
        let con:Connection = await this._connectionOpen();
        if (!con) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '数据库连接失败';
            return this.jsonResponse;
        }
        // 校验用户权限
        let token = req.headers.token;
        let params = req.body;
        let res:JsonResponse = await this.getLoginUser(token);
        if (!res.data) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '用户不存在';
            return this.jsonResponse;
        }
        let user:User = res.data;
        user.nickname = params.nickname;
        user.avatar = params.avatar;
        let result = await User.save(user);
        if (!result) {
            this.jsonResponse = new JsonResponseError();
            this.jsonResponse.message = '修改失败';
            return this.jsonResponse;
        }
        this.jsonResponse = new JsonResponseSuccess();
        this.jsonResponse.message = '修改成功';
        this.jsonResponse.data = result;
        return this.jsonResponse;
    }
}
