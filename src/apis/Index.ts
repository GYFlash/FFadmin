// ProjectName: express_01
// FileName: Connection.ts
// 作者：区区电脑
// createTime: 2019/4/22

import * as express from 'express';
import { Router } from "express-serve-static-core";
import { JsonResponse, FileManager } from "../common/common";
import { UserController } from "../controller/UserController";
import {SettingController} from "../controller/SettingController";
import multer from 'multer';

let upload = multer({dest: 'upload_tmp/'});
let router:Router = express.Router();

//// 用户注册
router.post('/register', async (req, res) => {
    let params = req.body;
    let userController = new UserController();
    let jsonResponse:JsonResponse = await userController.userRegister(params);
    res.json(jsonResponse);
});

//// 用户登录
router.post('/login', async (req, res) => {
    let params = req.body;
    let userController = new UserController();
    let jsonResponse:JsonResponse = await userController.userLogin(params);
    res.json(jsonResponse);
});

//// 用户列表查询
router.post('/getUsers', async (req, res) => {
    let params = req.body;
    let userController = new UserController();
    let jsonResponse:JsonResponse = await userController.userGetAll(params);
    let data:any = jsonResponse;
    let length = jsonResponse.data.length;
    let start = (parseInt(params.page) - 1) * parseInt(params.recPerPage);
    let end = start + parseInt(params.recPerPage);
    data.result = jsonResponse.status;
    data.data = jsonResponse.data.slice(start, end);
    data.message = jsonResponse.message;
    data.pager = {
        page: params.page,
        recTotal: length,
        recPerPage: params.recPerPage
    };
    res.json(data);
});

//// 获取登录用户信息
router.post('/get-my-info', async (req, res) => {
    let userController:UserController = new UserController();
    let jsonResponse:JsonResponse = await userController.getMyInfo(req);
    res.json(jsonResponse);
});

//// 设置登录用户信息
router.post('/set-my-info', async (req, res) => {
    let userController:UserController = new UserController();
    let jsonResponse:JsonResponse = await userController.setMyInfo(req);
    res.json(jsonResponse);
});

//// 修改管理员权限
router.post('/set-user-manager', async (req, res) => {
    let userController:UserController = new UserController();
    let jsonResponse:JsonResponse = await userController.setUserManager(req);
    res.json(jsonResponse);
});

//// 设置侧边栏导航
router.post('/set-menu', async (req, res) => {
    let params = req.body;
    let settingController = new SettingController();
    let jsonResponse:JsonResponse = await settingController.settingNavigation(params);
    res.json(jsonResponse);
});

//// 获取侧边栏导航
router.get('/get-menu',  async (req, res) => {
    let settingController = new SettingController();
    let jsonResponse:JsonResponse = await settingController.getNavigation();
    res.json(jsonResponse);
});

//// 删除侧边栏导航
router.post('/del-menu', async function (req, res) {
    let params = req.body;
    let settingController = new SettingController();
    let jsonResponse:JsonResponse = await settingController.deleteNavigation(params);
    res.json(jsonResponse);
});

//// 文件上传
router.post('/file-upload', upload.any(), async function (req, res) {
    // @ts-ignore
    let jsonResponse:JsonResponse = await FileManager.save(req.files[0]);
    res.json(jsonResponse);
});

module.exports = router;
