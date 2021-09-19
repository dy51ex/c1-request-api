import { components } from '../../types';
import c1request from '../base/c1request';
import Request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Возвращает классы обьекта в виде массива, если пенедно назнвание класса, возвращает только его
 * @example $.projectsGet.projectClasses(projectId, 'allTabs')
 */
async function projectClasses(
  className: string
): Promise<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.App.ObjectClasses.Dto.ObjectClassDto']>;
async function projectClasses(): Promise<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.App.ObjectClasses.Dto.ObjectClassDto'][]>;
async function projectClasses(className?: string) {
  const logic = async () => {
    const response = await c1request<components['schemas']['CaseMap.Modules.Projects.BusinessDAL.App.ObjectClasses.Dto.ObjectClassDto'][]>({
      type: 'get',
      url: '/api/ObjectClasses/GetObjectClasses',
    });
    if (className) return response.find((classObject: any) => className === classObject.Name);
    return response;
  };

  return LogAction('$.projectsGet.projectClasses', logic);
}
export default projectClasses;
