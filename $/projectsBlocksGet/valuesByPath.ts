import { components, Field, FieldPath } from '../../types';
import LogAction from '../base/LogAction';
import valuesByPathFn from '../base/valuesByPath';

// async function valuesByPath(
//     project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks
// .ProjectAllVisualBlocksResponse'],
//     params: { fieldPath: FieldPath[] }
// ): Promise<Field['Value'][]>;
async function valuesByPath(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { fieldPath: FieldPath[]; deepValues: true }
): Promise<[string | boolean | number]>;
async function valuesByPath(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { grouping: 'blocks' | 'lines'; returnFields: true; fieldPath: FieldPath[] }
): Promise<Field[][]>;
async function valuesByPath(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { grouping: 'blocks' | 'lines'; fieldPath: FieldPath[] }
): Promise<Field['Value'][][]>;
async function valuesByPath(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { grouping: 'blocks' | 'lines'; fieldPath: FieldPath[]; deepValues: true }
): Promise<[string | boolean | number][]>;
async function valuesByPath(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { grouping: 'blocksLines'; returnFields: true; fieldPath: FieldPath[] }
): Promise<Field[][][]>;
async function valuesByPath(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: {
        grouping: 'blocksLines';
        fieldPath: FieldPath[];
        returnFields: false;
    }
): Promise<Field['Value'][][][]>;
async function valuesByPath(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { grouping: 'blocksLines'; fieldPath: FieldPath[]; deepValues: true }
): Promise<[string | boolean | number][][]>;
/**
 * Ищет значения по указанному пути (путь можно получить
 * с помошью pathsByName), возвращает массив данных, в зависимости от параметров
 * @example $.projectsBlocksGet.valuesByPath(
 * form, { fieldPath: { blockId: '3271c745-9d01-eb11-b826-0050560107dd',
 * lineId:'3271c745-9d01-eb11-b826-0050560107dd',
 * fieldId:'3271c745-9d01-eb11-b826-0050560107dd' }, grouping: 'blocks',
 * returnFields: true, deepValues: true })
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function valuesByPath(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: {
        fieldPath: FieldPath[];
        grouping?: 'blocks' | 'lines' | 'blocksLines';
        returnFields?: boolean;
        deepValues?: boolean;
    },
) {
    const logic = () => valuesByPathFn(project, params);
    return LogAction('$.projectsBlocksGet.valuesByPath', logic);
}
export default valuesByPath;
