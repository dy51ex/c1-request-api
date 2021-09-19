import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Удаляет справочник с указанным Id
 * @example $.dictionarySet.deleteDict(dictId)
 */
export default async (
    dictId: string,
): Promise<components['schemas']['CaseDotStar.ServicePackages.Common.Database.Data.DictionaryMetadata']> => {
    const logic = () => c1request<components['schemas']['CaseDotStar.ServicePackages.Common.Database.Data.DictionaryMetadata']>({
        url: `/api/Dictionary/DeleteDictionary?dictionaryId=${dictId}`,
        type: 'delete',
    });
    return LogAction('$.dictionarySet.deleteDict', logic);
};
