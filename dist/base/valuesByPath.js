"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LogAction_1 = __importDefault(require("./LogAction"));
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
exports.default = (obj, params) => {
    const logic = () => {
        if (!params.fieldPath)
            throw new Error('no fieldPath present');
        if (!obj.Blocks)
            throw new Error('no Blocks found');
        const result = [];
        const lines = obj.Blocks.filter((block) => {
            if (!block.VisualBlockId) {
                throw new Error('No VisualBlockId found in Blocks');
            }
            return params.fieldPath.map((el) => el.blockId).includes(block.VisualBlockId);
        })
            .map((block) => {
            var _a;
            return Object.assign(block, {
                Lines: ((_a = block.Lines) !== null && _a !== void 0 ? _a : []).map((line) => Object.assign(line, {
                    blockId: block.VisualBlockId,
                    blockRealId: block.Id,
                    blockName: block.Name,
                    blockOrder: block.Order,
                })),
            });
        })
            .flatMap((block) => block.Lines)
            .filter((line) => { var _a; return params.fieldPath.map((el) => el.lineId).includes((_a = line.BlockLineId) !== null && _a !== void 0 ? _a : ''); });
        lines.forEach((line) => {
            var _a;
            (_a = line.Values) === null || _a === void 0 ? void 0 : _a.forEach((field) => {
                const fieldData = params.fieldPath
                    .map((el) => el.fieldId).includes(field.VisualBlockProjectFieldId);
                if (fieldData) {
                    const curField = params.fieldPath
                        .find((el) => el.fieldId === field.VisualBlockProjectFieldId);
                    if (!line.blockId
                        || !line.BlockLineId
                        || !line.blockRealId
                        || !(curField === null || curField === void 0 ? void 0 : curField.fieldId)) {
                        throw new Error('No all needed info from FieldPath');
                    }
                    result.push({
                        Value: field.Value,
                        Name: curField.name,
                        blockId: line.blockId,
                        blockRealId: line.blockRealId,
                        blockName: line.blockName || undefined,
                        blockOrder: line.blockOrder,
                        lineId: line.BlockLineId,
                        lineRealId: line.Id || undefined,
                        lineOrder: line.Order,
                        fieldId: curField === null || curField === void 0 ? void 0 : curField.fieldId,
                        multiBlock: curField === null || curField === void 0 ? void 0 : curField.multiBlock,
                        multiLine: curField === null || curField === void 0 ? void 0 : curField.multiLine,
                    });
                }
            });
        });
        if (!params.grouping) {
            if (params.returnFields) {
                return result;
            }
            if (params.deepValues) {
                const dresult = result.map((field) => ((field === null || field === void 0 ? void 0 : field.Value) !== undefined && typeof (field === null || field === void 0 ? void 0 : field.Value) === 'object'
                    ? field.Value.Name
                    : field === null || field === void 0 ? void 0 : field.Value));
                return dresult;
            }
            const dresult = result.map((field) => field === null || field === void 0 ? void 0 : field.Value);
            return dresult;
        }
        if (params.grouping === 'blocks') {
            const groupedResult = {};
            result
                .filter((el) => el)
                .forEach((field) => {
                if (!field.blockRealId)
                    throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                if (!groupedResult[field.blockRealId])
                    groupedResult[field.blockRealId] = [];
                groupedResult[field.blockRealId].push(field);
            });
            if (params.returnFields) {
                const fresult = Object.values(groupedResult);
                return fresult;
            }
            if (params.deepValues) {
                const fresult = Object.values(groupedResult).map((block) => block.map((field) => ((field === null || field === void 0 ? void 0 : field.Value) !== undefined && typeof (field === null || field === void 0 ? void 0 : field.Value) === 'object'
                    ? field.Value.Name
                    : field === null || field === void 0 ? void 0 : field.Value)));
                return fresult;
            }
            const fresult = Object.values(groupedResult)
                .map((block) => block.map((field) => field.Value));
            return fresult;
        }
        if (params.grouping === 'lines') {
            const groupedResult = {};
            result
                .filter((el) => el)
                .forEach((field) => {
                if (!field.lineRealId) {
                    throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                }
                if (!groupedResult[field.lineRealId])
                    groupedResult[field.lineRealId] = [];
                groupedResult[field.lineRealId].push(field);
            });
            if (params.returnFields) {
                const fresult = Object.values(groupedResult);
                return fresult;
            }
            if (params.deepValues) {
                const fresult = Object.values(groupedResult)
                    .map((line) => line.map((field) => ((field === null || field === void 0 ? void 0 : field.Value) !== undefined && typeof (field === null || field === void 0 ? void 0 : field.Value) === 'object'
                    ? field.Value.Name : field === null || field === void 0 ? void 0 : field.Value)));
                return fresult;
            }
            const fresult = Object.values(groupedResult)
                .map((line) => line.map((field) => field.Value));
            return fresult;
        }
        if (params.grouping === 'blocksLines') {
            const groupedResult = {};
            result
                .filter((el) => el)
                .forEach((field) => {
                if (!field.blockRealId)
                    throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                if (!groupedResult[field.blockRealId])
                    groupedResult[field.blockRealId] = [];
                groupedResult[field.blockRealId].push(field);
            });
            const grouped = Object.values(groupedResult);
            const blockLines = grouped.map((block) => {
                const lineGroup = {};
                block
                    .filter((el) => el)
                    .forEach((field) => {
                    if (!field.lineRealId)
                        throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                    if (!lineGroup[field.lineRealId])
                        lineGroup[field.lineRealId] = [];
                    lineGroup[field.lineRealId].push(field);
                });
                return Object.values(lineGroup);
            });
            if (params.returnFields) {
                return blockLines;
            }
            if (params.deepValues) {
                const fresult = blockLines
                    .map((block) => block
                    .map((line) => line
                    .map((field) => ((field === null || field === void 0 ? void 0 : field.Value) !== undefined && typeof (field === null || field === void 0 ? void 0 : field.Value) === 'object'
                    ? field.Value.Name : field === null || field === void 0 ? void 0 : field.Value))));
                return fresult;
            }
            const fresult = blockLines
                .map((block) => block.map((line) => line.map((field) => field.Value)));
            return fresult;
        }
        return [];
    };
    return (0, LogAction_1.default)('$.valuesByPath', logic);
};
//# sourceMappingURL=valuesByPath.js.map