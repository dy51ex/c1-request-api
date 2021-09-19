import { components, Field, FieldPath } from '../../types';
import LogAction from './LogAction';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (obj: components['schemas']['CaseMap.Modules.Projects.Responses.VisualBlocks.ProjectAllVisualBlocksResponse'],
    params: {
        fieldPath: FieldPath[];
        grouping?: 'blocks' | 'lines' | 'blocksLines';
        returnFields?: boolean;
        deepValues?: boolean;
    }) => {
    const logic = () => {
        if (!params.fieldPath) throw new Error('no fieldPath present');
        if (!obj.Blocks) throw new Error('no Blocks found');
        const result = [] as Field[];
        const lines = obj.Blocks.filter((block) => {
            if (!block.VisualBlockId) {
                throw new Error('No VisualBlockId found in Blocks');
            }
            return params.fieldPath.map((el) => el.blockId).includes(block.VisualBlockId);
        })
            .map((block) => Object.assign(block, {
                Lines: (block.Lines ?? []).map((line) => Object.assign(line, {
                    blockId: block.VisualBlockId,
                    blockRealId: block.Id,
                    blockName: block.Name,
                    blockOrder: block.Order,
                })),
            }))
            .flatMap((block) => block.Lines)
            .filter((line) => params.fieldPath.map((el) => el.lineId).includes(line.BlockLineId ?? ''));
        lines.forEach((line) => {
            line.Values?.forEach((field) => {
                const fieldData = params.fieldPath
                    .map((el) => el.fieldId).includes(field.VisualBlockProjectFieldId);
                if (fieldData) {
                    const curField = params.fieldPath
                        .find((el) => el.fieldId === field.VisualBlockProjectFieldId);
                    if (!line.blockId
                        || !line.BlockLineId
                        || !line.blockRealId
                        || !curField?.fieldId) {
                        throw new Error('No all needed info from FieldPath');
                    }
                    result.push({
                        Value: field.Value as Field['Value'],
                        Name: curField.name,
                        blockId: line.blockId,
                        blockRealId: line.blockRealId,
                        blockName: line.blockName || undefined,
                        blockOrder: line.blockOrder,
                        lineId: line.BlockLineId,
                        lineRealId: line.Id || undefined,
                        lineOrder: line.Order,
                        fieldId: curField?.fieldId,
                        multiBlock: curField?.multiBlock,
                        multiLine: curField?.multiLine,
                    });
                }
            });
        });
        if (!params.grouping) {
            if (params.returnFields) {
                return result;
            }
            if (params.deepValues) {
                const dresult = result.map((field) => (
                    field?.Value !== undefined && typeof field?.Value === 'object'
                        ? field.Value.Name
                        : field?.Value
                ));
                return dresult;
            }
            const dresult = result.map((field) => field?.Value as string | number | boolean);
            return dresult;
        }
        if (params.grouping === 'blocks') {
            const groupedResult: { [key: string]: Field[] } = {};
            result
                .filter((el) => el)
                .forEach((field) => {
                    if (!field.blockRealId) throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                    if (!groupedResult[field.blockRealId]) groupedResult[field.blockRealId] = [];
                    groupedResult[field.blockRealId].push(field);
                });
            if (params.returnFields) {
                const fresult = Object.values(groupedResult);
                return fresult;
            }
            if (params.deepValues) {
                const fresult = Object.values(groupedResult).map(
                    (block) => block.map((field) => (
                        field?.Value !== undefined && typeof field?.Value === 'object'
                            ? field.Value.Name
                            : field?.Value)),
                );
                return fresult;
            }
            const fresult = Object.values(groupedResult)
                .map((block) => block.map((field) => field.Value as string | number | boolean));
            return fresult;
        }
        if (params.grouping === 'lines') {
            const groupedResult: { [key: string]: Field[] } = {};
            result
                .filter((el) => el)
                .forEach((field) => {
                    if (!field.lineRealId) {
                        throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                    }
                    if (!groupedResult[field.lineRealId]) groupedResult[field.lineRealId] = [];
                    groupedResult[field.lineRealId].push(field);
                });
            if (params.returnFields) {
                const fresult = Object.values(groupedResult);
                return fresult;
            }
            if (params.deepValues) {
                const fresult = Object.values(groupedResult)
                    .map((line) => line.map((field) => (
                        field?.Value !== undefined && typeof field?.Value === 'object'
                            ? field.Value.Name : field?.Value)));
                return fresult;
            }
            const fresult = Object.values(groupedResult)
                .map((line) => line.map((field) => field.Value));
            return fresult;
        }
        if (params.grouping === 'blocksLines') {
            const groupedResult: { [key: string]: Field[] } = {};
            result
                .filter((el) => el)
                .forEach((field) => {
                    if (!field.blockRealId) throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                    if (!groupedResult[field.blockRealId]) groupedResult[field.blockRealId] = [];
                    groupedResult[field.blockRealId].push(field);
                });
            const grouped = Object.values(groupedResult);
            const blockLines = grouped.map((block) => {
                const lineGroup: { [key: string]: Field[] } = {};
                block
                    .filter((el) => el)
                    .forEach((field) => {
                        if (!field.lineRealId) throw new Error('$.projectsGet.valuesByPath - no blockRealId found in field');
                        if (!lineGroup[field.lineRealId]) lineGroup[field.lineRealId] = [];
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
                            .map((field) => (
                                field?.Value !== undefined && typeof field?.Value === 'object'
                                    ? field.Value.Name : field?.Value))));
                return fresult;
            }
            const fresult = blockLines
                .map((block) => block.map((line) => line.map((field) => field.Value)));
            return fresult;
        }
        return [];
    };
    return LogAction('$.valuesByPath', logic);
};
