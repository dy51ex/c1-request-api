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
 * Возвращает данные отчета, с условиями фильтров, если передано
 * @example $.reportsGet.reportData({ ReportMetadataId: uuid, { Дата: ['2020-01-01', '2020-01-30'], 'Тип дела':['Продажи'] }})
 */
function default_1(params) {
    return __awaiter(this, void 0, void 0, function* () {
        const logic = () => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const reportRun = yield (0, c1request_1.default)({
                type: 'post',
                url: '/api/Reports/Run',
                body: { ReportMetadataId: params.ReportMetadataId },
            });
            const possibleFilters = (_a = reportRun.Filters) !== null && _a !== void 0 ? _a : [];
            const requestFilters = Object.entries((_b = params.Filters) !== null && _b !== void 0 ? _b : []);
            const fullFilters = requestFilters.map((filter) => {
                const filterData = possibleFilters.find((pFilter) => pFilter.Name === filter[0]);
                if (!filterData) {
                    throw `$.ReportsGet.reportData(reportRun)(filterData) - no filter found by name - ${filter[0]}`;
                }
                if (filterData.Type === 'Date') {
                    return {
                        BeginValue: filter[1][0],
                        EndValue: filter[1][1],
                        ReportFieldId: filterData.Id,
                    };
                }
                else {
                    return {
                        SearchValues: filter[1],
                        ReportFieldId: filterData.Id,
                    };
                }
            });
            return (0, c1request_1.default)({
                type: 'post',
                url: '/api/Reports/GetFixedReportData',
                body: Object.assign({ PageSize: 100 }, params ? Object.assign(params, { Filters: fullFilters }) : {}),
            });
        });
        return (0, LogAction_1.default)('$.reportsGet.reportData', logic);
    });
}
exports.default = default_1;
//# sourceMappingURL=reportData.js.map