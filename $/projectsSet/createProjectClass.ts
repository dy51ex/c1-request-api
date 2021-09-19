import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Создает новый класс дел
 * @example $.projectsSet.createProjectClass({ Name: 'Новый класс', Section: 'Вкладка1', Icon: 'Computer' })
 */
export default async function (
  params: components['schemas']['CaseMap.Modules.Projects.BusinessDAL.App.ObjectClasses.Requests.CreateObjectClass']
): Promise<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.App.ObjectClasses.Dto.ObjectClassDto']> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.App.ObjectClasses.Dto.ObjectClassDto']>({
      type: 'post',
      url: '/api/ObjectClasses/CreateObjectClass',
      body: params,
    });
  };
  return LogAction('$.projectsSet.createProjectClass', logic);
}
