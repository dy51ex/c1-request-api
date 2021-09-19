import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Получает все блоки созданные в конструкторе обьектов
 * @example $.projectsGet.projectBlocksTypes(projectId)
 */
export default async function (): Promise<components['schemas']['CaseMap.Modules.Projects.Interfaces.Data.VisualBlocks.VisualBlockResponse'][]> {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.Modules.Projects.Interfaces.Data.VisualBlocks.VisualBlockResponse'][]>({
      type: 'post',
      url: '/api/VisualBlocks/GetCustomVisualBlocks',
      body: { PageSize: 999 },
    });
  };
  return LogAction('$.projectsGet.projectBlocksTypes', logic);
}
