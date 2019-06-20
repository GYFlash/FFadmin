"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// FileName: TokenMiddleware.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/25
const common_1 = require("./common");
const TokenMiddleware = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let resType = req.headers.restype;
        let token = req.headers.token;
        // 不应该拦截的请求 url
        if (common_1.Intercept.shouldNot(req.originalUrl)) {
            next();
        }
        else {
            // 应该拦截的请求 url
            if (token == 'undefined' || token == 'null' || token == '') {
                res.json({
                    status: 'error',
                    message: '未登录',
                    code: '201'
                });
            }
            else {
                let result = yield common_1.Token.check(token);
                if (result.data) {
                    next();
                }
                else {
                    if (resType) {
                        res.json(result);
                    }
                    else {
                        res.redirect('/admin/login');
                    }
                }
            }
        }
    });
};
module.exports = TokenMiddleware;
//# sourceMappingURL=TokenMiddleware.js.map