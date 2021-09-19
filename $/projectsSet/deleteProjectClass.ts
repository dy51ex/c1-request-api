import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Удаляет класс дела
 * @example $.projectsSet.deleteProjectClass(id)
 */
export default async function (
  projectClassId: string
): Promise<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.App.ObjectClasses.Dto.ObjectClassDto']> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.App.ObjectClasses.Dto.ObjectClassDto']>({
      type: 'delete',
      url: `/api/ObjectClasses/DeleteObjectClass/{Id}?request.id=${projectClassId}`,
    });
  };
  return LogAction('$.projectsSet.deleteProjectClass', logic);
}
