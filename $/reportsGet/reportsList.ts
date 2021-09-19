import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Возвращает список отчетов
 * @example $.reportsGet.reportsList()
 */

export default async function (
  params?: components['schemas']['CaseMap.Modules.Reports.App.ReportCatalogs.Criteria.GetReportFolderContent']
): Promise<components['schemas']['CaseMap.Modules.Reports.App.ReportCatalogs.ReportListItem'][]> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.Reports.App.ReportCatalogs.ReportListItem'][]>({
      type: 'post',
      url: '/api/ReportCatalog/GetContent',
      body: Object.assign({ PageSize: 100 }, params ? params : {}),
    });
  };
  return LogAction('$.reportsGet.reportsList', logic);
}
