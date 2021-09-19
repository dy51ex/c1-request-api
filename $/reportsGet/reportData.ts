import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Возвращает данные отчета, с условиями фильтров, если передано
 * @example $.reportsGet.reportData({ ReportMetadataId: uuid, { Дата: ['2020-01-01', '2020-01-30'], 'Тип дела':['Продажи'] }})
 */

export default async function (params: {
  ReportMetadataId: string;
  Filters?: { [key: string]: string | string[] };
  Page?: number | undefined;
  PageSize?: number | undefined;
}): Promise<components['schemas']['CaseMap.Modules.Reports.Response.ReportCellResponse'][][]> {
  const logic = async () => {
    const reportRun = await c1request<components['schemas']['CaseMap.Modules.Reports.Response.ReportResultResponse']>({
      type: 'post',
      url: '/api/Reports/Run',
      body: { ReportMetadataId: params.ReportMetadataId },
    });
    const possibleFilters = reportRun.Filters ?? [];
    const requestFilters = Object.entries(params.Filters ?? []);
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
      } else {
        return {
          SearchValues: filter[1],
          ReportFieldId: filterData.Id,
        };
      }
    });
    return c1request<components['schemas']['CaseMap.Modules.Reports.Response.ReportCellResponse'][][]>({
      type: 'post',
      url: '/api/Reports/GetFixedReportData',
      body: Object.assign({ PageSize: 100 }, params ? Object.assign(params, { Filters: fullFilters }) : {}),
    });
  };
  return LogAction('$.reportsGet.reportData', logic);
}
