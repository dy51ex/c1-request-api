"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SettingsController_1 = require("../base/SettingsController");
exports.default = (level, method, state, data) => {
    if (!SettingsController_1.settings.debug) {
        return;
    }
    const dataString = typeof data === 'string' ? data : data === null || data === void 0 ? void 0 : data.Error;
    console.log(`${level}: [${method}]{${state}} - ${dataString || ''}`);
};
//# sourceMappingURL=debug.js.map