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
function projectById(projectId, tabs = 'noTabs') {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => __awaiter(this, void 0, void 0, function* () {
            const project = yield (0, c1request_1.default)({
                type: 'get',
                url: `/api/projects/GetProject?projectId=${projectId}`,
            });
            if (tabs === 'noTabs')
                return project;
            if (tabs === 'mainTab') {
                const mainTab = yield (0, c1request_1.default)({
                    type: 'get',
                    url: `/api/ProjectCustomValues/GetProjectSummary/?request.id=${projectId}`,
                });
                return Object.assign(project, mainTab);
            }
            if (tabs === 'allTabs') {
                const allTabs = (0, c1request_1.default)({
                    type: 'get',
                    url: `/api/ProjectCustomValues/GetAllVisualBlocks?request.projectId=${projectId}`,
                });
                return Object.assign(project, allTabs);
            }
            const tab = project.ProjectType.Tabs.find((tabData) => tabData.Name === tabs);
            const response = (0, c1request_1.default)({
                type: 'get',
                url: `/api/ProjectCustomValues/GetProjectTab/?request.id=${project.Id}&request.projectTypeTabId=${tab.Id}`,
            });
            return Object.assign(project, response);
        });
        return (0, LogAction_1.default)('$.projectsGet.projectById', logic);
    });
}
exports.default = projectById;
//# sourceMappingURL=projectById.js.map