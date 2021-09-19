import { components, FieldPath } from '../../types';
import LogAction from '../base/LogAction';
import pathsByName from '../base/pathsByName';

/**
 * Осуществляет поиск поля по его названию в MetadataOfBlocks,
 * если поле не найдено - вызывет ошибку. Для получения значения поля
 * лучше использовать $.clientForms.valuesByName
 * @method $.clientForms.pathsByName
 * @example $.clientForms.pathsByName(form, { fieldNames:
 * ['Поле 1', 'Поле 2'], blockName: 'Новый блок' })
 */
export default async (
    form: components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto'],
    params: {
        fieldNames: string[];
        blockName?: string;
    },
): Promise<FieldPath[]> => {
    const logic = () => pathsByName(form, params);
    return LogAction<FieldPath[]>('$.clientForms.pathsByName', logic);
};
