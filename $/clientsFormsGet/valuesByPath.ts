import { components, Field, FieldPath } from '../../types';
import LogAction from '../base/LogAction';
import valuesByPathFn from '../base/valuesByPath';


async function valuesByPath(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { fieldPath: FieldPath[]; deepValues: true }
): Promise<ReturnType<typeof valuesByPathFn>>;
async function valuesByPath(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { grouping: 'blocks' | 'lines'; returnFields: true; fieldPath: FieldPath[] }
): Promise<ReturnType<typeof valuesByPathFn>>;
async function valuesByPath(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { grouping: 'blocks' | 'lines'; fieldPath: FieldPath[] }
): Promise<ReturnType<typeof valuesByPathFn>>;
async function valuesByPath(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { grouping: 'blocks' | 'lines'; fieldPath: FieldPath[]; deepValues: true }
): Promise<ReturnType<typeof valuesByPathFn>>;
async function valuesByPath(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { grouping: 'blocksLines'; returnFields: true; fieldPath: FieldPath[] }
): Promise<ReturnType<typeof valuesByPathFn>>;
async function valuesByPath(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: {
        grouping: 'blocksLines';
        fieldPath: FieldPath[];
        returnFields: false;
    }
): Promise<ReturnType<typeof valuesByPathFn>>;
async function valuesByPath(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: { grouping: 'blocksLines'; fieldPath: FieldPath[]; deepValues: true }
): Promise<ReturnType<typeof valuesByPathFn>>;
/**
 * Ищет значения по указанному пути (путь можно получить
 * с помошью pathsByName), возвращает массив данных, в зависимости от параметров
 * @example $.clientFormsGet.valuesByPath(form, { fieldPath:
 * { blockId: '3271c745-9d01-eb11-b826-0050560107dd', lineId:'3271c745-9d01-eb11-b826-0050560107dd',
 * fieldId:'3271c745-9d01-eb11-b826-0050560107dd' }, grouping: 'blocks',
 * returnFields: true, deepValues: true })
 */
async function valuesByPath(
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: {
        fieldPath: FieldPath[];
        grouping?: 'blocks' | 'lines' | 'blocksLines';
        returnFields?: boolean;
        deepValues?: boolean;
    },
): Promise<ReturnType<typeof valuesByPathFn>> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const logic = () => valuesByPathFn(form, params);
    return LogAction('$.clientFormsGet.valuesByPath', logic);
}
export default valuesByPath;
