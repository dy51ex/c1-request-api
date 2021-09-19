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
 * Создает новое дело с основными данными - ответственный, название и тд, для записи в блоки, после создания нужно их получить, используя $.projectsGet.projectById(project, 'allTabs')
 * @example $.projectsSet.projectStructure(projectStructure)
 */
function default_1(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => {
            return (0, c1request_1.default)({
                type: 'post',
                url: '/api/Projects/CreateProject',
                body: params,
            });
        };
        return (0, LogAction_1.default)('$.projectsSet.projectCreate', logic);
    });
}
exports.default = default_1;
//# sourceMappingURL=createProject.js.map