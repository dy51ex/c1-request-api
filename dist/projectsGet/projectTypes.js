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
function projectTypes(projectTypeName) {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, c1request_1.default)({
                type: 'post',
                url: '/api/ProjectTypes/GetProjectTypes',
                body: { PageSize: 999 },
            });
            console.log(1231231, response);
            if (projectTypeName) {
                const projectType = response.find((type) => type.Name === projectTypeName);
                if (!projectType)
                    throw `$.projectsGet.projectTypes - no type named - ${projectTypeName}`;
                const responseDetailed = yield (0, c1request_1.default)({
                    type: 'get',
                    url: `/api/ProjectTypes/GetProjectType/GetProjectType?projectTypeId=${projectType.Id}`,
                });
                return responseDetailed;
            }
            return Promise.all(response.map((type) => (0, c1request_1.default)({
                type: 'get',
                url: `/api/ProjectTypes/GetProjectType/GetProjectType?projectTypeId=${type.Id}`,
            })));
        });
        return (0, LogAction_1.default)('$.projectsGet.projectSettings', logic);
    });
}
exports.default = projectTypes;
//# sourceMappingURL=projectTypes.js.map