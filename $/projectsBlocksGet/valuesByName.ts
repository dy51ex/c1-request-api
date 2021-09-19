import { components, Field } from '../../types';
import LogAction from '../base/LogAction';
import valuesByPath from './valuesByPath';
import pathsByName from './pathsByName';

async function valuesByName(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { fieldNames: string[]; blockName?: string }
): Promise<Field['Value'][]>;
async function valuesByName(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { fieldNames: string[]; blockName?: string; deepValues: true }
): Promise<any[]>;
async function valuesByName(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { grouping: 'blocks' | 'lines'; returnFields: true; fieldNames: string[]; blockName?: string }
): Promise<Field[][]>;
async function valuesByName(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { grouping: 'blocks' | 'lines'; fieldNames: string[]; blockName?: string }
): Promise<Field['Value'][][]>;
async function valuesByName(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: { grouping: 'blocks' | 'lines'; fieldNames: string[]; blockName?: string; deepValues: true }
): Promise<[string | boolean | number][]>;
async function valuesByName(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: {
        grouping?: 'blocksLines';
        returnFields: true;
        fieldNames: string[];
        blockName?: string;
    }
): Promise<Field[][][]>;
/**
 * Совершает поиск значений поля по его имени, возвращает массив результатов в
 * зависимости от параметров, например ['Значение1', 'Значение2']
 * @example $.projectsBlocksGet.valuesByName(form,
 * { fieldNames: ['Поле 1', 'Поле 2'] , blockName: 'Новый блок', deepValues: true })
 */
async function valuesByName(
    project: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: {
        fieldNames: string[];
        blockName?: string;
        grouping?: 'blocks' | 'lines' | 'blocksLines';
        returnFields?: boolean;
        deepValues?: boolean;
    },
): Promise<Field['Value'][] | [string | boolean | number] | Field['Value'][][] | Field[][] | Field[][][]> {
    const logic = async () => {
        const paths = await pathsByName(project, params);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const values = await valuesByPath(project, Object.assign(params, { fieldPath: paths }));
        return values as Field['Value'][] | [string | boolean | number] | Field['Value'][][] | Field[][] | Field[][][];
    };
    return LogAction('$.projectsBlocksGet.valuesByName', logic);
}
export default valuesByName;
