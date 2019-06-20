"use strict";
// ProjectName: express_01
// FileName: User.ts
// 作者：区区电脑
// createTime: 2019/4/22
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
let User = class User extends typeorm_1.BaseEntity {
    setInfo(info) {
        // this.id = info.id;
        // this.account = info.account;
        // this.password = info.password;
        // this.age = info.age;
        // this.avatar = info.avatar;
        // this.sign = info.sign;
        // this.admin = info.admin;
        for (let key in info) {
            if (info[key] && key != 'id') {
                // @ts-ignore
                this[key] = info[key];
            }
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Object)
], User.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        charset: 'utf8'
    }),
    __metadata("design:type", Object)
], User.prototype, "account", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Object)
], User.prototype, "age", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        charset: 'utf8'
    }),
    __metadata("design:type", Object)
], User.prototype, "sign", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        charset: 'utf8'
    }),
    __metadata("design:type", Object)
], User.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        charset: 'utf8'
    }),
    __metadata("design:type", Object)
], User.prototype, "token", void 0);
__decorate([
    typeorm_1.Column('int'),
    __metadata("design:type", Object)
], User.prototype, "admin", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        charset: 'utf8'
    }),
    __metadata("design:type", Object)
], User.prototype, "avatar", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        charset: 'utf8'
    }),
    __metadata("design:type", Object)
], User.prototype, "nickname", void 0);
User = __decorate([
    typeorm_1.Entity()
], User);
exports.User = User;
//# sourceMappingURL=User.js.map