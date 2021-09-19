import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Возвращает настройки , такие как биллинг, бюджет, клиенты
 * @example $.projectsGet.projectSettings(projectId)
 */
export default async function (
  projectId: string
): Promise<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.Responses.ProjectSettingsResponse']> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.Responses.ProjectSettingsResponse']>({
      type: 'get',
      url: `/api/ProjectSettings/GetSettings?projectId=${projectId}`,
    });
  };
  return LogAction('$.projectsGet.projectSettings', logic);
}
