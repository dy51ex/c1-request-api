import { FieldPath } from '../../types';
import LogAction from './LogAction';

export default async (
    obj: Record<string, any>,
    params: {
        fieldNames: string[];
        blockName?: string;
    },
): Promise<FieldPath[]> => {
    const logic = () => {
        const keys = ['MetadataOfBlocks', 'MetadataBlocks'];
        const key = keys.find((entry) => obj[entry]);
        if (!key) throw new Error('obj - no MetadataOfBlocks found in project');

        const result = [] as FieldPath[];
        // eslint-disable-next-line
        obj[key].forEach((block: Record<string, any>) => block.Lines?.forEach(
            // eslint-disable-next-line
            (line: Record<string, any>) => line.Fields?.forEach(
                (field: Record<string, Record<string, any> | string>) => {
                    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                    const name = typeof field.ProjectField === 'object' ? field.ProjectField.Name : '';
                    if (!field.ProjectField
                        || !name
                        || !line.LineType
                        || !block.Id
                        || !line.Id
                        || !field.Id) {
                        throw new Error('obj - no ProjectField in field found or LineType undefined');
                    }
                    if (
                        params.fieldNames.includes(name || 'undefined')
            && (params.blockName ? block.NameInProject === params.blockName : true)
                    ) {
                        result[params.fieldNames.indexOf(name)] = {
                            blockId: block.Id as string,
                            lineId: line.Id as string,
                            fieldId: field.Id as string,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                            blockName: block.NameInProject,
                            multiBlock: block.IsRepeatable as boolean,
                            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
                            multiLine: line.LineType.SysName === 'Repeated',
                            name: name as string,
                        };
                    }
                },
            ),
        ));
        return result;
    };
    return LogAction('$.pathsByName', logic);
};
