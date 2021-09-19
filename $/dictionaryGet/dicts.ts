/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Получет список словарей без элементов, если передается
 * параметром низвание словаря - возвращает только его вместе с элементами
 * @example $.dictionaryGet.dicts(dictName)
 */
async function dicts(
    dictName: string
): Promise<{
    Id: string;
    SystemName: string;
    Items: components['schemas']['CaseDotStar.ServicePackages.Dictionaries.DictionaryItemSummary'][];
}>;
async function dicts(): Promise<components['schemas']['CaseDotStar.ServicePackages.Common.Database.Data.DictionaryMetadata'][]>;
async function dicts(dictName?: string) {
    const logic = async () => {
        const response = await c1request<components['schemas']['CaseDotStar.ServicePackages.Common.Database.Data.DictionaryMetadata'][]>({
            url: '/api/Dictionary/GetDictionaryList',
            type: 'post',
            body: dictName ? { Name: dictName, PageSize: 999 } : { PageSize: 999 },
        });
        if (!dictName) return response;
        const responseItems = await c1request<unknown>({
            url: '/api/Dictionary/GetDictionaryItems',
            type: 'post',
            body: {
                // @ts-ignore
                SystemName: response.Result[0].SystemName,
                WithSubItems: true,
                PageSize: 999,
            },
        });
        const result = {
            // @ts-ignore
            Id: response.Result[0].Id,
            // @ts-ignore
            SystemName: response.Result[0].SystemName,
            // @ts-ignore
            Items: responseItems.Result,
        } as {
            Id: string;
            SystemName: string;
            Items: components['schemas']['CaseDotStar.ServicePackages.Dictionaries.DictionaryItemSummary'][];
        };
        return result;
    };
    return LogAction('$.dictionaryGet.dicts', logic);
}
export default dicts;
