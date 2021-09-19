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
const LogAction_1 = __importDefault(require("../base/LogAction"));
const valuesByPath_1 = __importDefault(require("../base/valuesByPath"));
const pathsByName_1 = __importDefault(require("../base/pathsByName"));
/**
 * Совершает поиск значений поля по его имени,
 * возвращает массив результатов в зависимости от параметров, например ['Значение1', 'Значение2']
 * @example $.clientForms.valuesByName(form, { fieldNames: ['Поле 1', 'Поле 2'] ,
 * blockName: 'Новый блок', deepValues: true })
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function valuesByName(form, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => __awaiter(this, void 0, void 0, function* () {
            const paths = yield (0, pathsByName_1.default)(form, params);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            const values = yield (0, valuesByPath_1.default)(form, Object.assign(params, { fieldPath: paths }));
            return values;
        });
        return (0, LogAction_1.default)('$.clientForms.valuesByName', logic);
    });
}
exports.default = valuesByName;
//# sourceMappingURL=valuesByName.js.map