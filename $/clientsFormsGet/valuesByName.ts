import { components, Field } from '../../types';
import LogAction from '../base/LogAction';
import valuesByPath from '../base/valuesByPath';
import pathsByName from '../base/pathsByName';

async function valuesByName(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { fieldNames: string[]; blockName?: string }
): Promise<Field['Value'][]>;
async function valuesByName(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { fieldNames: string[]; blockName?: string; deepValues: true }
): Promise<any[]>;
async function valuesByName(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { grouping: 'blocks' | 'lines'; returnFields: true; fieldNames: string[]; blockName?: string }
): Promise<Field[][]>;
async function valuesByName(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { grouping: 'blocks' | 'lines'; fieldNames: string[]; blockName?: string }
): Promise<Field['Value'][][]>;
async function valuesByName(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { grouping: 'blocks' | 'lines'; fieldNames: string[]; blockName?: string; deepValues: true }
): Promise<[string | boolean | number][]>;
async function valuesByName(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: {
        grouping?: 'blocksLines';
        returnFields: true;
        fieldNames: string[];
        blockName?: string;
    }
): Promise<Field[][][]>;
/**
 * Совершает поиск значений поля по его имени,
 * возвращает массив результатов в зависимости от параметров, например ['Значение1', 'Значение2']
 * @example $.clientForms.valuesByName(form, { fieldNames: ['Поле 1', 'Поле 2'] ,
 * blockName: 'Новый блок', deepValues: true })
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
async function valuesByName(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: {
        fieldNames: string[];
        blockName?: string;
        grouping?: 'blocks' | 'lines' | 'blocksLines';
        returnFields?: boolean;
        deepValues?: boolean;
    },
) {
    const logic = async () => {
        const paths = await pathsByName(form, params);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const values = await valuesByPath(form, Object.assign(params, { fieldPath: paths }));
        return values as Field['Value'][] | [string | boolean | number] | Field['Value'][][] | Field[][] | Field[][][];
    };
    return LogAction('$.clientForms.valuesByName', logic);
}
export default valuesByName;
