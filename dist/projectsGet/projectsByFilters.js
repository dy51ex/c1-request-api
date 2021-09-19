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
const projectClasses_1 = __importDefault(require("../projectsGet/projectClasses"));
/**
 * Фильтрует дела по указанным параметрам, возвращая массив отфильтрованных дел
 * @example $.projectsGet.projectsByFilters({'Направление': 'Продажи'}, 'Дело', 1, 20, 'Папка с делами')
 */
function default_1(filterFields, projectClass, page, pageSize, folderName) {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => __awaiter(this, void 0, void 0, function* () {
            const filterNames = Object.keys(filterFields);
            const defaultFilters = yield (0, c1request_1.default)({
                type: 'get',
                url: '/api/ProjectFilter/GetDefaultFilters',
            });
            const filters = yield Promise.all(filterNames.map((filterName) => __awaiter(this, void 0, void 0, function* () {
                const customFilters = yield (0, c1request_1.default)({
                    type: 'post',
                    url: '/api/ProjectFilter/GetFilters',
                    body: { Name: filterName, PageSize: 1000 },
                });
                const allfilters = defaultFilters.concat(customFilters);
                const filter = allfilters.find((filterEntry) => filterEntry.Name === filterName);
                if (!filter)
                    throw `$.projectsGet.projectsByFilters - no filter with name ${filterName} found`;
                const responseFilterItems = yield (0, c1request_1.default)({
                    type: 'post',
                    url: '/api/ProjectFilter/GetFilterSuggest',
                    body: { FilterId: filter.Id, Name: filterFields[filterName], PageSize: 1000 },
                });
                return Object.assign(filter, { Items: responseFilterItems });
            })));
            const prepareFilters = filters
                .filter((filter) => filter.Type !== 'Date')
                .map((filter) => ({
                DataField: { Id: filter.Id },
                SearchValues: filter.Items.filter((item) => { var _a, _b; return filterFields[(_a = filter.Name) !== null && _a !== void 0 ? _a : ''].includes((_b = item.Name) !== null && _b !== void 0 ? _b : ''); }).map((item) => item.Id),
            }));
            const prepareFiltersDate = filters
                .filter((f) => f.Type === 'Date')
                .map((filter) => {
                var _a, _b;
                return ({
                    DataField: { Id: filter.Id },
                    SearchValues: [false],
                    BeginValue: filterFields[(_a = filter.Name) !== null && _a !== void 0 ? _a : ''],
                    EndValue: filterFields[(_b = filter.Name) !== null && _b !== void 0 ? _b : ''],
                });
            });
            const prepareClasses = yield (0, projectClasses_1.default)(projectClass);
            if (!prepareClasses)
                throw `$.projectsGet.projectsByFilters - no classes found`;
            const filter = { Filters: [...prepareFilters, ...prepareFiltersDate], ObjectClassId: prepareClasses.Id };
            const groupedProjects = yield (0, c1request_1.default)({
                type: 'post',
                url: '/api/Projects/GetGroupedProjects',
                body: Object.assign(filter, { Page: page || 1, PageSize: pageSize || 20 }),
            });
            if (!folderName) {
                const res = groupedProjects.map((entry) => entry.Projects).flat();
                return res || [];
            }
            const projects = groupedProjects.find((elem) => { var _a; return ((_a = elem === null || elem === void 0 ? void 0 : elem.ProjectGroupResponse) === null || _a === void 0 ? void 0 : _a.Name) === (folderName === 'Все дела' ? 'Дела' : folderName); });
            const projectsProjects = projects === null || projects === void 0 ? void 0 : projects.Projects;
            return (projects === null || projects === void 0 ? void 0 : projects.Projects) || [];
        });
        // @ts-ignore
        return (0, LogAction_1.default)('$.projectsGet.projectClasses', logic);
    });
}
exports.default = default_1;
//# sourceMappingURL=projectsByFilters.js.map