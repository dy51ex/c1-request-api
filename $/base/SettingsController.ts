import axios from 'axios';

axios.defaults.baseURL = '';

export class SettingsController {
    login: string;

    password: string;

    domain: string;

    token!: string | undefined;

    tokenExpiresIn!: number | undefined;

    constructor(login: string, password: string, domain: string) {
        this.login = login;
        this.password = password;
        this.domain = domain;
        this.tokenExpiresIn = process.env.expiresIn
            ? Number.parseInt(process.env.expiresIn, 10)
            : undefined;
        this.token = process.env.token
            ? process.env.token
            : undefined;
    }

    async getToken(): Promise<string> {
        if (!this.token) {
            const timestamp = Date.now();
            if (!this.tokenExpiresIn || timestamp > this.tokenExpiresIn) {
                await this.requestToken();
                if (!this.token) {
                    throw new Error('connection: cant refresh auth token');
                }
                return this.token;
            }
        }
        if (!this.token) {
            throw new Error('connection: something wrong with auth token');
        }
        return this.token;
    }

    async requestToken(): Promise<void> {
        try {
            const timestamp = Date.now();
            const response = (
                await axios.post('/api/ThirdPartyAuth/Login', {
                    Login: this.login,
                    Password: this.password,
                    RememberMe: true,
                    ProviderName: 'IDE',
                })
            ).data as { Token: { access_token: string }, expires_in: string };
            this.token = response.Token.access_token;
            console.log(this.token);
            const expiresIn = timestamp + parseInt(`${response.expires_in}000`, 10);
            this.tokenExpiresIn = expiresIn;
            process.env.tokenExpiresIn = this.tokenExpiresIn.toString();
            console.log('New token catched');
        } catch (error) {
            console.warn(`Token not received, possible bad auth - ${(error as Error).message}`);
        }
    }
}

interface Settings {
    controller: SettingsController,
    version: number | undefined,
    debug: boolean,
}

export const settings = {} as Settings;

export const useSettingsStore = (
    login: string, password: string,
    domain: string,
    version = undefined,
    debug = false,
): void => {
    axios.defaults.baseURL = domain;
    settings.controller = new SettingsController(login, password, domain);
    settings.version = version;
    settings.debug = debug;
};

export { axios };
