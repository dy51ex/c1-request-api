import { components, FieldPath } from '../../types';
import LogAction from '../base/LogAction';
/**
 * Записывает в передаваемый обьект данные по указанному пути, для записи изменений нужно вызвать $.projectsSet.updateProject()
 * @example $.projectsBlocksSet.valueToBlock(project, $.projectsBlocksGet.pathsByName(project, { fieldNames: ['Поле 1'], blockName: 'Новый блок' })[0], 'Значение 2')
 */
export default function (
  project: components['schemas']['CaseMap.Modules.Projects.Models.Projects.ProjectSummaryWithBlocks'],
  fieldPath: FieldPath,
  valueToSave: any
) {
  const logic = () => {
    if (!project.Blocks) throw '$.projectsSet.valueToBlock - no Block found in project';
    const blockIsExist = project.Blocks.find(
      (block) =>
        block.VisualBlockId === fieldPath.blockId &&
        (fieldPath.blockOrder ? fieldPath.blockOrder === block.Order : true)
    );
    const blockIndex = blockIsExist
      ? project.Blocks.map((block) => block.VisualBlockId! + (fieldPath.blockOrder ? block.Order : '')).indexOf(
          fieldPath.blockId + (fieldPath.blockOrder ? fieldPath.blockOrder : '')
        )
      : project.Blocks.push({ VisualBlockId: fieldPath.blockId, Order: fieldPath.blockOrder || 0, Lines: [] }) - 1;

    const lineIsExist = project.Blocks[blockIndex].Lines!.find(
      (line: any) =>
        line.BlockLineId === fieldPath.lineId &&
        (fieldPath.lineOrder === 0 || fieldPath.lineOrder ? fieldPath.lineOrder === line.Order : true)
    );
    const lineIndex = lineIsExist
      ? project.Blocks[blockIndex]
          .Lines!.map((line: any) => line.BlockLineId! + (fieldPath.lineOrder ? line.Order : ''))
          .indexOf(fieldPath.lineId + (fieldPath.lineOrder ? fieldPath.lineOrder : ''))
      : project.Blocks[blockIndex].Lines!.push({
          BlockLineId: fieldPath.lineId,
          Order: fieldPath.lineOrder || 0,
          Values: [],
        }) - 1;

    const fieldIsExist = project.Blocks[blockIndex].Lines![lineIndex].Values!.find(
      (value: any) => value.VisualBlockProjectFieldId === fieldPath.fieldId
    );
    const fieldIndex = fieldIsExist
      ? project.Blocks[blockIndex]
          .Lines![lineIndex].Values!.map((value: any) => value.VisualBlockProjectFieldId)
          .indexOf(fieldPath.fieldId)
      : project.Blocks[blockIndex].Lines![lineIndex].Values!.push({
          VisualBlockProjectFieldId: fieldPath.fieldId,
        }) - 1;
    project.Blocks[blockIndex].Lines![lineIndex].Values![fieldIndex].Value = valueToSave; //eslint-disable-line
    return project;
  };
  return LogAction('$.projectsBlocksSet.valueToBlock', logic);
}
