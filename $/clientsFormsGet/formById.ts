import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Возвращает структуру клиентского запроса по указанному Id формы
 * @example $.clientForms.formById(id)
 */

export default async (
    formId: string,
): Promise<components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto']> => {
    const logic = () => c1request<components['schemas']['CaseMap.Modules.Projects.App.IntakeForm.ViewModels.IntakeObjectDto']>({
        type: 'get',
        url: `/api/IntakeObjects/Get/?Id=${formId}`,
    });
    return LogAction('$.clientForms.formById', logic);
};
