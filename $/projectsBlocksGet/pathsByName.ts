import { components, FieldPath } from '../../types';
import LogAction from '../base/LogAction';
import pathsByName from '../base/pathsByName';

/**
 * Получает путь до значения поля по имени поля, возвращая массив путей
 * @example $.projectsBlocksGet.pathsByName(
 *  project, { fieldNames: ['Поле 1', 'Поле 2'], blockName: 'Новый блок' }
 * )
 */
export default async (
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: {
        fieldNames: string[];
        blockName?: string;
    },
): Promise<FieldPath[]> => {
    const logic = () => pathsByName(project, params);
    return LogAction('$.projectsBlocksGet.pathsByName', logic);
};
