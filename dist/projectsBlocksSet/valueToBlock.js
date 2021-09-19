"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogAction_1 = __importDefault(require("../base/LogAction"));
/**
 * Записывает в передаваемый обьект данные по указанному пути, для записи изменений нужно вызвать $.projectsSet.updateProject()
 * @example $.projectsBlocksSet.valueToBlock(project, $.projectsBlocksGet.pathsByName(project, { fieldNames: ['Поле 1'], blockName: 'Новый блок' })[0], 'Значение 2')
 */
function default_1(project, fieldPath, valueToSave) {
    const logic = () => {
        if (!project.Blocks)
            throw '$.projectsSet.valueToBlock - no Block found in project';
        const blockIsExist = project.Blocks.find((block) => block.VisualBlockId === fieldPath.blockId &&
            (fieldPath.blockOrder ? fieldPath.blockOrder === block.Order : true));
        const blockIndex = blockIsExist
            ? project.Blocks.map((block) => block.VisualBlockId + (fieldPath.blockOrder ? block.Order : '')).indexOf(fieldPath.blockId + (fieldPath.blockOrder ? fieldPath.blockOrder : ''))
            : project.Blocks.push({ VisualBlockId: fieldPath.blockId, Order: fieldPath.blockOrder || 0, Lines: [] }) - 1;
        const lineIsExist = project.Blocks[blockIndex].Lines.find((line) => line.BlockLineId === fieldPath.lineId &&
            (fieldPath.lineOrder === 0 || fieldPath.lineOrder ? fieldPath.lineOrder === line.Order : true));
        const lineIndex = lineIsExist
            ? project.Blocks[blockIndex]
                .Lines.map((line) => line.BlockLineId + (fieldPath.lineOrder ? line.Order : ''))
                .indexOf(fieldPath.lineId + (fieldPath.lineOrder ? fieldPath.lineOrder : ''))
            : project.Blocks[blockIndex].Lines.push({
                BlockLineId: fieldPath.lineId,
                Order: fieldPath.lineOrder || 0,
                Values: [],
            }) - 1;
        const fieldIsExist = project.Blocks[blockIndex].Lines[lineIndex].Values.find((value) => value.VisualBlockProjectFieldId === fieldPath.fieldId);
        const fieldIndex = fieldIsExist
            ? project.Blocks[blockIndex]
                .Lines[lineIndex].Values.map((value) => value.VisualBlockProjectFieldId)
                .indexOf(fieldPath.fieldId)
            : project.Blocks[blockIndex].Lines[lineIndex].Values.push({
                VisualBlockProjectFieldId: fieldPath.fieldId,
            }) - 1;
        project.Blocks[blockIndex].Lines[lineIndex].Values[fieldIndex].Value = valueToSave; //eslint-disable-line
        return project;
    };
    return (0, LogAction_1.default)('$.projectsBlocksSet.valueToBlock', logic);
}
exports.default = default_1;
//# sourceMappingURL=valueToBlock.js.map