import { settings } from '../base/SettingsController';

export default (
    level: 'Error' | 'Info',
    method: string,
    state: 'started' | 'progress' | 'ended',
    data?: string | Record<string, string>,
): void => {
    if (!settings.debug) {
        return;
    }
    const dataString = typeof data === 'string' ? data : data?.Error;
    if (level !== 'Error') {
        return;
    }
    console.log(`${level}: [${method}]{${state}} - ${dataString || ''}`);
};
