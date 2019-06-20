"use strict";
// FileName: SettingController.ts
// ProjectName: express-admin
// 作者：区区电脑
// createTime: 2019/4/28
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseController_1 = require("./BaseController");
const common_1 = require("../common/common");
const Navigation_1 = require("../models/Navigation");
class SettingController extends BaseController_1.BaseController {
    constructor() {
        super();
    }
    /**
     * 设置侧边栏导航
     * @param params
     */
    settingNavigation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let navs = JSON.parse(params.data);
            let connection = yield this._connectionOpen();
            if (!connection) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            let array = [];
            for (let i = 0; i < navs.length; i++) {
                let nav = new Navigation_1.Navigation();
                nav.id = navs[i].id;
                nav.title = navs[i].title;
                nav.iconClass = navs[i].iconClass || 'icon icon-user';
                nav.subNavItems = JSON.stringify(navs[i].subNavItems);
                array.push(nav);
            }
            let result = yield connection.manager.save(array);
            if (!result) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '保存失败';
                return this.jsonResponse;
            }
            else {
                this.jsonResponse = new common_1.JsonResponseSuccess();
                this.jsonResponse.message = '保存成功';
                return this.jsonResponse;
            }
        });
    }
    /**
     * 获取侧边栏导航
     * @param params
     */
    getNavigation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = yield this._connectionOpen();
            if (!connection) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            let navs = yield Navigation_1.Navigation.find();
            let array = [];
            for (let i = 0; i < navs.length; i++) {
                let nav = navs[i];
                if (navs[i].subNavItems) {
                    // @ts-ignore
                    nav.subNavItems = JSON.parse(navs[i].subNavItems);
                }
                array.push(nav);
            }
            this.jsonResponse = new common_1.JsonResponseSuccess();
            this.jsonResponse.data = array;
            return this.jsonResponse;
        });
    }
    deleteNavigation(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let connection = yield this._connectionOpen();
            if (!connection) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '数据库连接失败';
                return this.jsonResponse;
            }
            let id = params.id;
            let nav = yield Navigation_1.Navigation.findOne({ id: id });
            if (!nav) {
                this.jsonResponse = new common_1.JsonResponseError();
                this.jsonResponse.message = '该导航不存在';
                return this.jsonResponse;
            }
            yield Navigation_1.Navigation.remove(nav);
            this.jsonResponse = new common_1.JsonResponseSuccess();
            this.jsonResponse.message = '删除成功';
            return this.jsonResponse;
        });
    }
}
exports.SettingController = SettingController;
//# sourceMappingURL=SettingController.js.map