/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { components } from '../../types/v2';
import c1request from '../../$/base/c1request';
import LogAction from '../../$/base/LogAction';

async function dictValues(dictId: string) {
    const logic = async () => {
        const response = await c1request<components['schemas']['CaseMap.PublicApi.Pagination.Page<CaseMap.PublicApi.Dictionaries.DictionaryValue>']>({
            url: `/api/v2/dictionaries/${dictId}/values`,
            type: 'get',
        });
        return response;
    };
    return LogAction('$.dictionaryGet.dicts', logic);
}
export default dictValues;
