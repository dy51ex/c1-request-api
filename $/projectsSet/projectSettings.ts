import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Сохраняет настройки проекта, для получения настроек можно использовать $.projectsGet.projectSettings(projectId)
 * @example $.projectsSet.projectSettings(projectSettingsStructure)
 */
export default async function (
  params: components['schemas']['CaseMap.Modules.Projects.BusinessDAL.Requests.ProjectSettingsSaveRequest']
): Promise<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.Responses.ProjectSettingsResponse']> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.Responses.ProjectSettingsResponse']>({
      type: 'put',
      url: `/api/ProjectSettings/SaveSettings`,
      body: params,
    });
  };
  return LogAction('$.projectsSet.projectSettings', logic);
}
