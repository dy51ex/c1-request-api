import { components } from '../../types';
import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Возвращает все типы дел в виде массива, если передано название типа - только его
 * @example $.projectsGet.projectTypes(projectTypeName)
 */
async function projectTypes(
    projectTypeName: string
): Promise<components['schemas']['CaseMap.Modules.Projects.Responses.ProjectTypeResponse']>;
async function projectTypes(): Promise<components['schemas']['CaseMap.Modules.Projects.Responses.ProjectTypeResponse'][]>;
async function projectTypes(projectTypeName?: string) {
    const logic = async () => {
        const response = await c1request<components['schemas']['CaseMap.Modules.Projects.Responses.ProjectTypeResponse'][]>({
            type: 'post',
            url: '/api/ProjectTypes/GetProjectTypes',
            body: { PageSize: 999 },
        });
        console.log(1231231, response);
        if (projectTypeName) {
            const projectType = response.find((type: any) => type.Name === projectTypeName);
            if (!projectType) throw `$.projectsGet.projectTypes - no type named - ${projectTypeName}`;
            const responseDetailed = await c1request<components['schemas']['CaseMap.Modules.Projects.Responses.ProjectTypeResponse']>({
                type: 'get',
                url: `/api/ProjectTypes/GetProjectType/GetProjectType?projectTypeId=${projectType.Id}`,
            });
            return responseDetailed;
        }
        return Promise.all(response.map(
            (type: any) => c1request<components['schemas']['CaseMap.Modules.Projects.Responses.ProjectTypeResponse']>({
                type: 'get',
                url: `/api/ProjectTypes/GetProjectType/GetProjectType?projectTypeId=${type.Id}`,
            }),
        ));
    };

    return LogAction('$.projectsGet.projectSettings', logic);
}
export default projectTypes;
