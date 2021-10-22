declare function fetch(): any

// const fetch = fetch || 1;
const axiosMock = typeof fetch === 'function' ? fetch : null;

export class SettingsController {
    constructor(
        private login: string,
        private password: string,
        private httpAgent: any,
        public platform: 'case' | 'node',
        public token?: string,
        public tokenExpiresIn?: number,
    ) {}

    async getToken(): Promise<string> {
        if (this.platform === 'case') {
            return 'none';
        }
        const timestamp = Date.now();
        if (!this.token || !this.tokenExpiresIn || timestamp > this.tokenExpiresIn) {
            const tokenn = await this.requestAndStoreToken();
            if (!tokenn) {
                throw new Error('connection: cant refresh auth token');
            }
            return tokenn;
        }
        return this.token;
    }

    async requestAndStoreToken(): Promise<string> {
        try {
            const timestamp = Date.now();
            const response = (
                await this.httpAgent.post('/api/ThirdPartyAuth/Login', {
                    Login: this.login,
                    Password: this.password,
                    RememberMe: true,
                    ProviderName: 'IDE',
                })
            ).data as { Token: { access_token: string, expires_in: string } };
            this.token = response.Token.access_token;
            const expiresIn = timestamp + parseInt(`${response.Token.expires_in}000`, 10);
            this.tokenExpiresIn = expiresIn;
            console.log('New token catched');
            return this.token;
        } catch (error) {
            throw new Error('Token not received, possible bad auth');
        }
    }
}

interface Settings {
    controller: SettingsController,
    version: number | undefined,
    debug: boolean,
    platform: 'case' | 'node',
    httpAgent: any,
}

export const settings = {} as Settings;

export const useSettingsStore = (params: {
    login: string,
    password: string,
    domain: string,
    version?: number,
    debug?: boolean,
    token?: string,
    tokenExpiresIn?: number,
    platform?: 'case' | 'node',
}): Settings => {
    settings.version = params.version;
    settings.debug = params.debug || false;
    let httpAgent;
    if (params.platform !== 'case') {
        httpAgent = require('axios');
        httpAgent.defaults.baseURL = params.domain;
    } else {
        httpAgent = axiosMock;
    }
    settings.httpAgent = httpAgent;
    settings.controller = new SettingsController(
        params.login,
        params.password,
        httpAgent,
        params.platform || 'node',
        params.token,
        params.tokenExpiresIn,
    );
    return settings;
};
