import { settings } from './SettingsController';

export default async <T>(options: {
    type: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    body?: Record<string, any> | undefined,
    params?: Record<string, any> | undefined,
}): Promise<T> => {
    const url = options.url.includes('?')
        ? `${options.url}&api-version=${settings.version || ''}`
        : `${options.url}?api-version=${settings.version || ''}`;
    let requestData = {
        url: `${settings.version ? url : options.url}`,
        method: options.type,
        headers: {
            'Content-Type': 'application/json',
        },
        body: options.body,
        data: options.body,
        params: options.params,
    }
    if (settings.controller.platform !== 'case') {
        // @ts-ignore
        requestData.headers.Authorization = `Bearer ${await settings.controller.getToken()}`;
    } else {
        // @ts-ignore
        requestData.body = JSON.stringify(requestData.body);
    }
    const request = await settings.httpAgent(requestData);
    const response = request.data || JSON.parse(request.body) as { Result?: unknown };
    return (response.Result || response) as T;
};
