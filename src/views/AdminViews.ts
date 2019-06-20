// FileName: AdminViews.ts
// ProjectName: express-typescript
// 作者：区区电脑
// createTime: 2019/4/23

import * as express from 'express';
import { Router } from "express-serve-static-core";

const router:Router = express.Router();

//// 首页
router.get('/', (req, res) => {
    res.render('admin/index', {
        title: 'FFAdmin'
    })
});

//// 主页
router.get('/home/console', (req, res) => {
    res.render('admin/home/console', {
        title: '主页'
    })
});
//
//// 注册
router.get('/register', async (req, res) => {
    res.render('admin/register', {
        title: '注册'
    })
});

//// 登录
router.get('/login', (req, res) => {
    res.render('admin/login', {title: '登录'})
});
//
// //// 设置侧边导航栏列表
// router.get('/set-menu', (req, res) =>{
//     res.render('admin/setting/menu', { title: '设置侧边导航栏' })
// });
//
// //// 设置-管理员设置
// router.get('/set-manager', (req, res) => {
//     res.render('admin/setting/manager', {title: '管理员'})
// });
//
// //// 账号设置
// router.get('/set-account', (req, res) => {
//     res.render('admin/setting/account', {title: '账号设置'})
// });

module.exports = router;
