import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';
import projectClasses from '../projectsGet/projectClasses';

/**
 * Фильтрует дела по указанным параметрам, возвращая массив отфильтрованных дел
 * @example $.projectsGet.projectsByFilters({'Направление': 'Продажи'}, 'Дело', 1, 20, 'Папка с делами')
 */
export default async function (
  filterFields: { [key: string]: string | string[] },
  projectClass: string,
  page?: number,
  pageSize?: number,
  folderName?: string
): Promise<components['schemas']['CaseMap.Modules.Projects.Responses.ProjectResponse'][]> {
  const logic = async () => {
    const filterNames = Object.keys(filterFields);
    const defaultFilters = await c1request<components['schemas']['CaseMap.Modules.Common.Responses.DataFields.FieldResponse'][]>({
      type: 'get',
      url: '/api/ProjectFilter/GetDefaultFilters',
    });

    const filters = await Promise.all(filterNames.map(async (filterName) => {
      const customFilters = await c1request<components['schemas']['CaseMap.Modules.Common.Responses.DataFields.FieldResponse'][]>(
        {
          type: 'post',
          url: '/api/ProjectFilter/GetFilters',
          body: { Name: filterName, PageSize: 1000 },
        }
      );
      const allfilters = defaultFilters.concat(customFilters);
      const filter = allfilters.find((filterEntry: any) => filterEntry.Name === filterName);
      if (!filter) throw `$.projectsGet.projectsByFilters - no filter with name ${filterName} found`;
      const responseFilterItems = await c1request<components['schemas']['CaseMap.Modules.Projects.Interfaces.Responses.Filter.FilterSuggestResponse'][]>(
        {
          type: 'post',
          url: '/api/ProjectFilter/GetFilterSuggest',
          body: { FilterId: filter.Id, Name: filterFields[filterName], PageSize: 1000 },
        }
      );
      return Object.assign(filter, { Items: responseFilterItems });
    }));
    const prepareFilters = filters
      .filter((filter) => filter.Type !== 'Date')
      .map((filter) => ({
        DataField: { Id: filter.Id },
        SearchValues: filter.Items.filter((item: any) => filterFields[filter.Name ?? ''].includes(item.Name ?? '')).map(
          (item: any) => item.Id
        ),
      }));
    const prepareFiltersDate = filters
      .filter((f) => f.Type === 'Date')
      .map((filter) => ({
        DataField: { Id: filter.Id },
        SearchValues: [false],
        BeginValue: filterFields[filter.Name ?? ''],
        EndValue: filterFields[filter.Name ?? ''],
      }));
    const prepareClasses = await projectClasses(projectClass);
    if (!prepareClasses) throw `$.projectsGet.projectsByFilters - no classes found`;
    const filter = { Filters: [...prepareFilters, ...prepareFiltersDate], ObjectClassId: prepareClasses.Id };

    const groupedProjects = await c1request<components['schemas']['CaseMap.Modules.Projects.Responses.GroupedProjectResponse'][]>(
      {
        type: 'post',
        url: '/api/Projects/GetGroupedProjects',
        body: Object.assign(filter, { Page: page || 1, PageSize: pageSize || 20 }),
      }
    );

    if (!folderName) {
      const res = groupedProjects.map((entry) => entry.Projects).flat();
      return res || [] as typeof res;
    }
    const projects = groupedProjects.find(
      (elem) => elem?.ProjectGroupResponse?.Name === (folderName === 'Все дела' ? 'Дела' : folderName)
    );
    const projectsProjects = projects?.Projects;
    return projects?.Projects || [] as typeof projectsProjects;
  };
  // @ts-ignore
  return LogAction('$.projectsGet.projectClasses', logic);
}
