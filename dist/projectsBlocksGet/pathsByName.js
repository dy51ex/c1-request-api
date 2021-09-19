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
const pathsByName_1 = __importDefault(require("../base/pathsByName"));
/**
 * Получает путь до значения поля по имени поля, возвращая массив путей
 * @example $.projectsBlocksGet.pathsByName(
 *  project, { fieldNames: ['Поле 1', 'Поле 2'], blockName: 'Новый блок' }
 * )
 */
exports.default = (project, params) => __awaiter(void 0, void 0, void 0, function* () {
    const logic = () => (0, pathsByName_1.default)(project, params);
    return (0, LogAction_1.default)('$.projectsBlocksGet.pathsByName', logic);
});
//# sourceMappingURL=pathsByName.js.map