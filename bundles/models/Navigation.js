"use strict";
// FileName: Navigation.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/28
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
let Navigation = class Navigation extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Object)
], Navigation.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        charset: 'utf8'
    }),
    __metadata("design:type", Object)
], Navigation.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        charset: 'utf8'
    }),
    __metadata("design:type", Object)
], Navigation.prototype, "subNavItems", void 0);
__decorate([
    typeorm_1.Column({
        type: 'text',
        charset: 'utf8'
    }),
    __metadata("design:type", Object)
], Navigation.prototype, "iconClass", void 0);
Navigation = __decorate([
    typeorm_1.Entity()
], Navigation);
exports.Navigation = Navigation;
//# sourceMappingURL=Navigation.js.map