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
const projectTypes_1 = __importDefault(require("../projectsGet/projectTypes"));
/**
 * Обновляет одну или более вкладок на деле, в зависимости от переданных параметров
 * @example $.projectsSet.updateProject(projectStructure, 'allTabs')
 */
function updateProject(params, tabs, tabName) {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => __awaiter(this, void 0, void 0, function* () {
            if (tabs === 'mainTab') {
                return (0, c1request_1.default)({
                    type: 'put',
                    url: '/api/Projects/UpdateProjectSummary',
                    body: params,
                });
            }
            if (tabs === 'allTabs') {
                return (0, c1request_1.default)({
                    type: 'put',
                    url: '/api/Projects/UpdateProjectWithBlocks',
                    body: params,
                });
            }
            if (tabs === 'oneTab') {
                const projectType = yield (0, projectTypes_1.default)(params.ProjectType.Name);
                const tab = projectType.Tabs.find((tabData) => tabData.Name === tabName);
                if (!tab || !tab.Id)
                    throw `$.projectsSet.updateProject - no tab found with name2 ${tabName}`;
                params.ProjectTypeTabId = tab.Id;
                return (0, c1request_1.default)({
                    type: 'put',
                    url: '/api/Projects/UpdateProjectTab',
                    body: params,
                });
            }
        });
        // @ts-expect-error
        return (0, LogAction_1.default)('$.projectsSet.updateProject', logic);
    });
}
exports.default = updateProject;
//# sourceMappingURL=updateProject.js.map