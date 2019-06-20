// FileName: TokenMiddleware.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/25
import {
    Token,
    TokenResult,
    Intercept
} from "./common";

const TokenMiddleware = async function (req:any, res:any, next:any) {
    let resType = req.headers.restype;
    let token = req.headers.token;
    // 不应该拦截的请求 url
    if (Intercept.shouldNot(req.originalUrl)) {
        next()
    } else {
        // 应该拦截的请求 url
        if (token == 'undefined' || token == 'null' || token == '') {
            res.json({
                status: 'error',
                message: '未登录',
                code: '201'
            })
        }  else {
            let result:TokenResult = await Token.check(token);
            if (result.data) {
                next()
            } else {
                if (resType) {
                    res.json(result)
                } else {
                    res.redirect('/admin/login')
                }
            }
        }
    }
};

module.exports = TokenMiddleware;
