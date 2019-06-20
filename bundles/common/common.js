"use strict";
// FileName: common.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/24
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const fs_1 = __importDefault(require("fs"));
//// 枚举 key
var ExpressKey;
(function (ExpressKey) {
    ExpressKey["tokenKey"] = "express_admin_token_key";
})(ExpressKey || (ExpressKey = {}));
exports.ExpressKey = ExpressKey;
//// 枚举 jsonResponse 响应类型
var JsonResponseStatus;
(function (JsonResponseStatus) {
    JsonResponseStatus["success"] = "success";
    JsonResponseStatus["error"] = "error";
})(JsonResponseStatus || (JsonResponseStatus = {}));
exports.JsonResponseStatus = JsonResponseStatus;
//// 枚举 jsonResponse 响应状态码
var JsonResponseStatusCode;
(function (JsonResponseStatusCode) {
    JsonResponseStatusCode["code_000"] = "000";
    JsonResponseStatusCode["code_100"] = "100"; // 统一失败
})(JsonResponseStatusCode || (JsonResponseStatusCode = {}));
exports.JsonResponseStatusCode = JsonResponseStatusCode;
//// token 校验结果
class TokenResult {
    constructor(data, message, code) {
        this.data = data;
        this.message = message;
        this.code = code;
    }
}
exports.TokenResult = TokenResult;
//// 拦截器
class Intercept {
    /**
     * 应该过滤
     * @param url
     */
    static shouldNot(url) {
        return url == '/api/register'
            || url == '/api/login'
            || url == '/api/getUsers'
            || url == '/'
            || url == '/ff-ui'
            || (url.indexOf('/admin') != -1);
    }
}
exports.Intercept = Intercept;
//// token
class Token {
    /**
     * 生成 token
     * @param user
     */
    static create(user) {
        return jsonwebtoken_1.default.sign(user, Token.key, {
            expiresIn: 60 * 60 * 2 + 's'
        });
    }
    /**
     * 校验 token
     * @param token
     */
    static check(token) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield new Promise((resolve) => {
                jsonwebtoken_1.default.verify(token, Token.key, (err, decode) => {
                    if (err) {
                        console.log(err.message);
                        let message = '无效的 token';
                        if (err.message == 'jwt malformed') {
                            message = '无效的 token';
                        }
                        else if (err.message == 'jwt expired') {
                            message = '登录超时';
                        }
                        resolve(new TokenResult(false, message, '201'));
                    }
                    else {
                        resolve(new TokenResult(decode, '', '000'));
                    }
                });
            });
        });
    }
}
/**
 * 生成 token 使用的 key
 */
Token.key = ExpressKey.tokenKey;
exports.Token = Token;
//// json 响应
class JsonResponse {
    constructor() {
        this.status = JsonResponseStatus.success;
        this.code = JsonResponseStatusCode.code_000;
        this.message = '';
    }
}
exports.JsonResponse = JsonResponse;
//// 操作成功的 json 响应对象
class JsonResponseSuccess extends JsonResponse {
    constructor() {
        super();
        this.status = JsonResponseStatus.success;
        this.code = JsonResponseStatusCode.code_000;
        this.message = '成功';
    }
}
exports.JsonResponseSuccess = JsonResponseSuccess;
//// 操作失败的 json 响应对象
class JsonResponseError extends JsonResponse {
    constructor() {
        super();
        this.status = JsonResponseStatus.error;
        this.code = JsonResponseStatusCode.code_100;
        this.message = '操作失败';
    }
}
exports.JsonResponseError = JsonResponseError;
//// md5加密
let Md5 = function (message) {
    const md5 = crypto_1.default.createHash('md5');
    return md5.update(message).digest('hex');
};
exports.Md5 = Md5;
//// 文件管理
class FileManager {
    // 获取当前时间
    static currentDate() {
        let date = new Date();
        return date.toLocaleDateString();
    }
    /**
     * 创建文件夹
     * @param path
     */
    static newFolder(path) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield fs_1.default.existsSync(path);
            if (result) {
                return true;
            }
            else {
                yield fs_1.default.mkdirSync(path);
                return true;
            }
        });
    }
    /**
     * 文件保存
     * @param file
     */
    static save(file) {
        return __awaiter(this, void 0, void 0, function* () {
            let jsonResponse;
            let readResult = yield fs_1.default.readFileSync(file.path);
            if (!readResult) {
                jsonResponse = new JsonResponseError();
                jsonResponse.message = '文件读取失败';
                return jsonResponse;
            }
            let currentDate = FileManager.currentDate();
            let timeValue = new Date().getTime();
            let fileName = timeValue + '.' + file.originalname;
            let filePath = 'upload/' + currentDate + '/';
            let res = yield FileManager.newFolder(FileManager.rootPath + filePath);
            if (!res) {
                jsonResponse = new JsonResponseError();
                jsonResponse.message = '文件夹创建失败';
                return jsonResponse;
            }
            yield fs_1.default.writeFileSync(FileManager.rootPath + filePath + fileName, readResult);
            jsonResponse = new JsonResponseSuccess();
            jsonResponse.message = '上传成功';
            jsonResponse.data = '/static/' + filePath + fileName;
            return jsonResponse;
        });
    }
}
// 根路径
FileManager.rootPath = './public/';
exports.FileManager = FileManager;
//# sourceMappingURL=common.js.map