import { components } from '../../types/v2';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

async function patch(
  objectId: string,
  body: any,
) {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.PublicApi.Cases.V2.CaseWithTaggedFields']>({
      type: 'patch',
      url: `/api/v2/objects/${objectId}`,
      body,
    });
  };

  return LogAction('$.objects.patch', logic);
}

export default patch;
