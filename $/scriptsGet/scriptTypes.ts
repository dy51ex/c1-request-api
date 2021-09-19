import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Возвращает системные типы сценариев
 * @example $.scriptsGet.scriptTypes()
 */
export default async (): Promise<components['schemas']['CaseDotStar.ServicePackages.Dictionaries.DictionaryItemSummary'][]> => {
    const logic = () => c1request<components['schemas']['CaseDotStar.ServicePackages.Dictionaries.DictionaryItemSummary'][]>({
        type: 'post',
        url: '/api/dictionary/getdictionaryitems',
        body: { PageSize: 999, SystemName: 'AutomationScriptType' },
    });
    return LogAction('$.scriptsGet.scriptTypes', logic);
};
