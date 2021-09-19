import debug from '../utils/debug';

export default async <T>(name: string, logic: () => T | Promise<T>): Promise<T> => {
    debug('Info', name, 'started', '');
    let result;
    try {
        result = await logic();
    } catch (err) {
        console.log(err);
        let error: string;
        try {
            error = JSON.stringify(err);
        } catch {
            error = err as string;
        }
        debug('Error', name, 'progress', error);
        throw new Error(`ERROR: ${name} - ${error}`);
    }
    debug('Info', name, 'ended', JSON.stringify(result));
    return result;
};
