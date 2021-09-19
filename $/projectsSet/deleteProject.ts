import c1request from '../base/c1request';
import LogAction from '../base/LogAction';

/**
 * Полностью удаляет дело (в том числе и из архива) по указанному Id, возвращает true при успешном удалении
 * @example $.projectsSet.deleteProject(projectId)
 */
export default async function (projectId: string): Promise<boolean> {
  const logic = async () => {
    await c1request({
      type: 'put',
      url: '/api/projects/Archive?Id=' + projectId,
    });
    return (await c1request({
      type: 'delete',
      url: '/api/Projects/DeleteProject/' + projectId,
    }) as any).result.IsSuccess;
  };
  return LogAction('$.projectsSet.deleteProject', logic);
}
