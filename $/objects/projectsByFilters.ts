import { components } from '../../types/v2';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

async function projectsByFilters(
  params: { FolderId?: string, ObjectClassId?: string, Page?: number, PageSize?: number }) {
  const logic = () => {
    return c1request<components['schemas']['CaseMap.PublicApi.Cases.V2.CaseWithTaggedFields']>({
      type: 'get',
      url: `/api/v2/projects`,
      params,
    });
  };

  return LogAction('$.public.projectsByFilters', logic);
}

export default projectsByFilters;
