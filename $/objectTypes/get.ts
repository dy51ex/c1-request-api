import { components } from '../../types/v2';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

async function get(objectTypeId: string) {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.PublicApi.CaseTypes.CaseTypeDetails']>({
      type: 'get',
      url: `/api/v2/objectTypes/${objectTypeId}`,
    });
  };

  return LogAction('$.objectTypes.get', logic);
}

export default get;
