// ProjectName: express_01
// FileName: Connection.ts
// 作者：区区电脑
// createTime: 2019/4/22

import 'reflect-metadata';
import {
    Connection,
    createConnection,
    getConnection,
} from "typeorm";
import {User} from "./User";
import {Navigation} from "./Navigation";

///// 开启默认链接
let connection:any = async function () {
    return new Promise<Connection>(async (resolve) => {
        try {
           let connect = getConnection();
           resolve(connect);
        } catch (e) {
            const connection = await createConnection({
                    type: "mysql",
                    host: "47.104.247.79",
                    port: 3306,
                    username: "ffadmin",
                    password: "88888886",
                    entityPrefix: 'express_',
                    database: 'test',
                    charset: "utf8",
                    entities: [
                        User,
                        Navigation
                    ],
                    extra: {
                        connectionLimit:  10, // 连接池最大连接数量, 查阅资料 建议是  core number  * 2 + n
                    },
                    synchronize: true
                });
            resolve(connection);
        }
    })
};

export {connection};
