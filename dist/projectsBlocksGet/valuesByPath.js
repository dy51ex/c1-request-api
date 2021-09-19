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
/**
 * Ищет значения по указанному пути (путь можно получить
 * с помошью pathsByName), возвращает массив данных, в зависимости от параметров
 * @example $.projectsBlocksGet.valuesByPath(
 * form, { fieldPath: { blockId: '3271c745-9d01-eb11-b826-0050560107dd',
 * lineId:'3271c745-9d01-eb11-b826-0050560107dd',
 * fieldId:'3271c745-9d01-eb11-b826-0050560107dd' }, grouping: 'blocks',
 * returnFields: true, deepValues: true })
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function valuesByPath(project, params) {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => (0, valuesByPath_1.default)(project, params);
        return (0, LogAction_1.default)('$.projectsBlocksGet.valuesByPath', logic);
    });
}
exports.default = valuesByPath;
//# sourceMappingURL=valuesByPath.js.map