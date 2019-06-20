"use strict";
// ProjectName: express_01
// FileName: Connection.ts
// 作者：区区电脑
// createTime: 2019/4/22
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Navigation_1 = require("./Navigation");
///// 开启默认链接
let connection = function () {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            try {
                let connect = typeorm_1.getConnection();
                resolve(connect);
            }
            catch (e) {
                const connection = yield typeorm_1.createConnection({
                    type: "mysql",
                    host: "47.104.247.79",
                    port: 3306,
                    username: "ffadmin",
                    password: "88888886",
                    entityPrefix: 'express_',
                    database: 'test',
                    charset: "utf8",
                    entities: [
                        User_1.User,
                        Navigation_1.Navigation
                    ],
                    extra: {
                        connectionLimit: 10,
                    },
                    synchronize: true
                });
                resolve(connection);
            }
        }));
    });
};
exports.connection = connection;
//# sourceMappingURL=Connection.js.map