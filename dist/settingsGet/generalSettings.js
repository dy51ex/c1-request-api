"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const c1request_1 = __importDefault(require("../base/c1request"));
const LogAction_1 = __importDefault(require("../base/LogAction"));
/**
 * Получает основные настройки инстанса
 * @example $.settingsGet.generalSettings()
 */
function default_1() {
    const logic = () => {
        return (0, c1request_1.default)({
            type: 'get',
            url: '/api/GeneralSettings/GetGeneralSettings',
        });
    };
    return (0, LogAction_1.default)('$.settingsGet.generalSettings', logic);
}
exports.default = default_1;
//# sourceMappingURL=generalSettings.js.map