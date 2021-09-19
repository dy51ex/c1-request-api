import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Отдает связанные дела, связанными считаются дела проставленные в блок ссылки или добавленные как обьект в конструкторе
 * @example $.projectsGet.relatedProjects(projectId)
 */
export default async function (
  projectId: string
): Promise<components['schemas']['CaseMap.Modules.Projects.App.RelatedObjects.ViewModels.RelatedObjectDto'][]> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.Projects.App.RelatedObjects.ViewModels.RelatedObjectDto'][]>({
      type: 'get',
      url: `/api/RelatedObjects/GetRelatedObjects?criterion.type=ProjectToProjects&criterion.id=${projectId}`,
    });
  };
  return LogAction('$.projectsGet.relatedProjects', logic);
}
