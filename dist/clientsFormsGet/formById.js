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
/**
 * Возвращает структуру клиентского запроса по указанному Id формы
 * @example $.clientForms.formById(id)
 */
exports.default = (formId) => __awaiter(void 0, void 0, void 0, function* () {
    const logic = () => (0, c1request_1.default)({
        type: 'get',
        url: `/api/IntakeObjects/Get/?Id=${formId}`,
    });
    return (0, LogAction_1.default)('$.clientForms.formById', logic);
});
//# sourceMappingURL=formById.js.map