import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Создает новый справочник
 * @example $.dictionarySet.createDict(dictStructure)
 */
export default async (
    params: components['schemas']['CaseDotStar.ServicePackages.Dictionaries.Requests.V42.CreateUserDefinedDictionaryRequest'],
): Promise<components['schemas']['CaseDotStar.ServicePackages.Common.Database.Data.DictionaryMetadata']> => {
    const logic = () => c1request<components['schemas']['CaseDotStar.ServicePackages.Common.Database.Data.DictionaryMetadata']>({
        url: '/api/Dictionary/CreateDictionary',
        type: 'post',
        body: params,
    });
    return LogAction('$.dictionarySet.createDict', logic);
};
