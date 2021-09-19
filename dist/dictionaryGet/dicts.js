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
const c1request_1 = __importDefault(require("../base/c1request"));
const LogAction_1 = __importDefault(require("../base/LogAction"));
function dicts(dictName) {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, c1request_1.default)({
                url: '/api/Dictionary/GetDictionaryList',
                type: 'post',
                body: dictName ? { Name: dictName, PageSize: 999 } : { PageSize: 999 },
            });
            if (!dictName)
                return response;
            const responseItems = yield (0, c1request_1.default)({
                url: '/api/Dictionary/GetDictionaryItems',
                type: 'post',
                body: {
                    // @ts-ignore
                    SystemName: response.Result[0].SystemName,
                    WithSubItems: true,
                    PageSize: 999,
                },
            });
            const result = {
                // @ts-ignore
                Id: response.Result[0].Id,
                // @ts-ignore
                SystemName: response.Result[0].SystemName,
                // @ts-ignore
                Items: responseItems.Result,
            };
            return result;
        });
        return (0, LogAction_1.default)('$.dictionaryGet.dicts', logic);
    });
}
exports.default = dicts;
//# sourceMappingURL=dicts.js.map