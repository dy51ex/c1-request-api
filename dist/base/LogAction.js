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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("../utils/debug"));
exports.default = (name, logic) => __awaiter(void 0, void 0, void 0, function* () {
    (0, debug_1.default)('Info', name, 'started', '');
    let result;
    try {
        result = yield logic();
    }
    catch (err) {
        console.log(err);
        let error;
        try {
            error = JSON.stringify(err);
        }
        catch (_a) {
            error = err;
        }
        (0, debug_1.default)('Error', name, 'progress', error);
        throw new Error(`ERROR: ${name} - ${error}`);
    }
    (0, debug_1.default)('Info', name, 'ended', JSON.stringify(result));
    return result;
});
//# sourceMappingURL=LogAction.js.map