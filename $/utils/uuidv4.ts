import LogAction from '../base/LogAction';

/**
 * Создает новый UUID
 * @example $.utils.uuidv4()
 */
export default async (): Promise<string> => {
    const logic = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        // eslint-disable-next-line no-bitwise
        const r = (Math.random() * 16) | 0;
        // eslint-disable-next-line no-bitwise
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
    return LogAction('$.utils.uuidv4', logic);
};
