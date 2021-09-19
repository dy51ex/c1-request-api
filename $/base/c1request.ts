import { settings, axios } from './SettingsController';

export default async <T>(params: {
    type: 'get' | 'post' | 'put' | 'delete' | 'patch',
    url: string,
    body?: Record<string, any> | undefined,
}): Promise<T> => {
    const url = params.url.includes('?')
        ? `${params.url}&api-version=${settings.version || ''}`
        : `${params.url}?api-version=${settings.version || ''}`;
    const request = await axios.request({
        url: `${settings.controller.domain}${settings.version ? url : params.url}`,
        method: params.type,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await settings.controller.getToken()}`,
        },
        data: params.body,
    });
    const response = request.data as { Result?: unknown };
    return (response.Result || response) as T;
};
