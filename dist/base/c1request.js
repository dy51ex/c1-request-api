"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SettingsController_1 = require("./SettingsController");
exports.default = (params) => __awaiter(void 0, void 0, void 0, function* () {
    const url = params.url.includes('?')
        ? `${params.url}&api-version=${SettingsController_1.settings.version || ''}`
        : `${params.url}?api-version=${SettingsController_1.settings.version || ''}`;
    const request = yield SettingsController_1.axios.request({
        url: `${SettingsController_1.settings.controller.domain}${SettingsController_1.settings.version ? url : params.url}`,
        method: params.type,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${yield SettingsController_1.settings.controller.getToken()}`,
        },
        data: params.body,
    });
    const response = request.data;
    return (response.Result || response);
});
//# sourceMappingURL=c1request.js.map