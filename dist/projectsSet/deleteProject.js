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
 * Полностью удаляет дело (в том числе и из архива) по указанному Id, возвращает true при успешном удалении
 * @example $.projectsSet.deleteProject(projectId)
 */
function default_1(projectId) {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => __awaiter(this, void 0, void 0, function* () {
            yield (0, c1request_1.default)({
                type: 'put',
                url: '/api/projects/Archive?Id=' + projectId,
            });
            return (yield (0, c1request_1.default)({
                type: 'delete',
                url: '/api/Projects/DeleteProject/' + projectId,
            })).result.IsSuccess;
        });
        return (0, LogAction_1.default)('$.projectsSet.deleteProject', logic);
    });
}
exports.default = default_1;
//# sourceMappingURL=deleteProject.js.map