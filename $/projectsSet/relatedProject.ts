import { components } from '../../types';
import c1request from '../base/c1request';
import Request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Добавляет дело в системный блок ссылки
 * @example relatedProject({ Id: '02df7e90-c387-448e-bb1b-acdb00e44a88', Type: 'ProjectToProjects', RelatedObjects: [{ Id: 'c6cad613-c057-419e-a08a-acde0085521c', Type: 'Project' }] })
 */
export default async function (
  params: components['schemas']['CaseMap.Modules.Projects.App.RelatedObjects.SaveRelatedObjects']
): Promise<any> {
  const logic = async () => {
    return (await c1request<any>({
      type: 'put',
      url: `/api/RelatedObjects/SaveRelatedObjects`,
      body: params,
    }));
  };
  return LogAction('$.projectsSet.relatedProject', logic);
}
8;
