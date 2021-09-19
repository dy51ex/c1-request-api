import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Создает новое дело с основными данными - ответственный, название и тд, для записи в блоки, после создания нужно их получить, используя $.projectsGet.projectById(project, 'allTabs')
 * @example $.projectsSet.projectStructure(projectStructure)
 */
export default async function (
  params: components['schemas']['CaseMap.Modules.Projects.App.Projects.CreateProjectRequest'],
): Promise<components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary']> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary']>({
      type: 'post',
      url: '/api/Projects/CreateProject',
      body: params,
    });
  };
  return LogAction('$.projectsSet.projectCreate', logic);
}
