import { components } from '../../types';
import c1request from '../base/c1request';
import Request from '../base/c1request';
import LogAction from '../base/LogAction';
import projectTypes from '../projectsGet/projectTypes';

async function updateProject(
  projectStructure:
    | components['schemas']['CaseMap.Modules.Projects.App.Projects.UpdateProjectWithBlocks']
    | components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary'],
  tabs: 'allTabs'
): Promise<components['schemas']['CaseMap.Modules.Projects.Models.Projects.ProjectSummaryWithBlocks']>;
async function updateProject(
  projectStructure:
    | components['schemas']['CaseMap.Modules.Projects.App.Projects.UpdateProjectWithBlocks']
    | components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary'],
  tabs: 'mainTab'
): Promise<components['schemas']['CaseMap.Modules.Projects.Models.Projects.ProjectSummaryWithBlocks']>;
async function updateProject(
  projectStructure:
    | components['schemas']['CaseMap.Modules.Projects.App.Projects.UpdateProjectWithBlocks']
    | components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary'],
  tabs: 'oneTab',
  tabName: string
): Promise<components['schemas']['CaseMap.Modules.Projects.Controllers.CustomTabResponse']>;
/**
 * Обновляет одну или более вкладок на деле, в зависимости от переданных параметров
 * @example $.projectsSet.updateProject(projectStructure, 'allTabs')
 */
async function updateProject(
  params: any,
  tabs: 'allTabs' | 'mainTab' | 'oneTab',
  tabName?: string
): Promise<components['schemas']['CaseMap.Modules.Projects.App.Projects.ProjectSummary']> {
  const logic = async () => {
    if (tabs === 'mainTab') {
      return c1request<components['schemas']['CaseMap.Modules.Projects.Models.Projects.ProjectSummaryWithBlocks']>({
        type: 'put',
        url: '/api/Projects/UpdateProjectSummary',
        body: params,
      });
    }
    if (tabs === 'allTabs') {
      return c1request<components['schemas']['CaseMap.Modules.Projects.Models.Projects.ProjectSummaryWithBlocks']>({
        type: 'put',
        url: '/api/Projects/UpdateProjectWithBlocks',
        body: params,
      });
    }
    if (tabs === 'oneTab') {
      const projectType = await projectTypes(params.ProjectType.Name);
      const tab = projectType!.Tabs!.find((tabData) => tabData.Name === tabName);
      if (!tab || !tab.Id) throw `$.projectsSet.updateProject - no tab found with name2 ${tabName}`;
      params.ProjectTypeTabId = tab.Id;
      return c1request<components['schemas']['CaseMap.Modules.Projects.Controllers.CustomTabResponse']>({
        type: 'put',
        url: '/api/Projects/UpdateProjectTab',
        body: params,
      });
    }
  };
  // @ts-expect-error
  return LogAction('$.projectsSet.updateProject', logic);
}
export default updateProject;
