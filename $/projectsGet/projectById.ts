import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Получение дела, с блоками или без, в зависимости от переданных параметров
 * @example $.projectsGet.projectById(projectId, 'allTabs')
 */

async function projectById(
  projectId: string,
  tabs: 'noTabs'
): Promise<components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary']>;
async function projectById(
  projectId: string,
  tabs: 'mainTab' | 'allTabs'
): Promise<components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary'] &
  components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse']>;
async function projectById(
  projectId: string,
  tabs: string
): Promise<components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary'] &
  components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectTabBaseResponse']>;
async function projectById(projectId: string, tabs: 'noTabs' | 'mainTab' | 'allTabs' | string = 'noTabs') {
  const logic = async () => {
    const project = await c1request<components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary']>({
      type: 'get',
      url: `/api/projects/GetProject?projectId=${projectId}`,
    });
    if (tabs === 'noTabs') return project;
    if (tabs === 'mainTab') {
      const mainTab = await c1request<components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse']>(
        {
          type: 'get',
          url: `/api/ProjectCustomValues/GetProjectSummary/?request.id=${projectId}`,
        }
      );
      return Object.assign(project, mainTab);
    }
    if (tabs === 'allTabs') {
      const allTabs = c1request<components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse']>(
        {
          type: 'get',
          url: `/api/ProjectCustomValues/GetAllVisualBlocks?request.projectId=${projectId}`,
        }
      );
      return Object.assign(project, allTabs);
    }
    const tab = project!.ProjectType!.Tabs!.find((tabData: any) => tabData.Name === tabs);
    const response = c1request<components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectTabBaseResponse']>(
      {
        type: 'get',
        url: `/api/ProjectCustomValues/GetProjectTab/?request.id=${project.Id}&request.projectTypeTabId=${tab!.Id}`,
      }
    );
    return Object.assign(project, response);
  };

  return LogAction('$.projectsGet.projectById', logic);
}
export default projectById;
