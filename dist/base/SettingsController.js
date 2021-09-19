"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axios = exports.useSettingsStore = exports.settings = exports.SettingsController = void 0;
const axios_1 = __importDefault(require("axios"));
exports.axios = axios_1.default;
axios_1.default.defaults.baseURL = '';
class SettingsController {
    constructor(login, password, domain) {
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
    getToken() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.token) {
                const timestamp = Date.now();
                if (!this.tokenExpiresIn || timestamp > this.tokenExpiresIn) {
                    yield this.requestToken();
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
        });
    }
    requestToken() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const timestamp = Date.now();
                const response = (yield axios_1.default.post('/api/ThirdPartyAuth/Login', {
                    Login: this.login,
                    Password: this.password,
                    RememberMe: true,
                    ProviderName: 'IDE',
                })).data;
                this.token = response.Token.access_token;
                console.log(this.token);
                const expiresIn = timestamp + parseInt(`${response.expires_in}000`, 10);
                this.tokenExpiresIn = expiresIn;
                process.env.tokenExpiresIn = this.tokenExpiresIn.toString();
                console.log('New token catched');
            }
            catch (error) {
                console.warn(`Token not received, possible bad auth - ${error.message}`);
            }
        });
    }
}
exports.SettingsController = SettingsController;
exports.settings = {};
const useSettingsStore = (login, password, domain, version = undefined, debug = false) => {
    axios_1.default.defaults.baseURL = domain;
    exports.settings.controller = new SettingsController(login, password, domain);
    exports.settings.version = version;
    exports.settings.debug = debug;
};
exports.useSettingsStore = useSettingsStore;
//# sourceMappingURL=SettingsController.js.map