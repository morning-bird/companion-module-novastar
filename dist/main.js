"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("@companion-module/base");
const config_1 = require("./config");
const actions_1 = require("./actions");
const node_cache_1 = __importDefault(require("node-cache"));
const axios_1 = __importDefault(require("axios"));
class ModuleInstance extends base_1.InstanceBase {
    cache = new node_cache_1.default();
    config = {
        host: '',
        username: '',
        password: '',
    };
    constructor(internal) {
        super(internal);
    }
    async init(config) {
        this.updateStatus(base_1.InstanceStatus.Connecting);
        this.config = config;
        this.cache = new node_cache_1.default({
            stdTTL: 180,
            deleteOnExpire: true,
        });
        try {
            await this.configUpdated(this.config);
            await this.getToken();
            this.setActionDefinitions((0, actions_1.getActionDefinitions)(this));
            this.updateStatus(base_1.InstanceStatus.Ok);
        }
        catch (exc) {
            this.updateStatus(base_1.InstanceStatus.ConnectionFailure);
        }
    }
    async getToken() {
        let token = this.cache.get('token');
        if (!token) {
            const instance = axios_1.default.create({
                baseURL: `http://${this.config.host}`,
            });
            const res = await instance.post('/api/user/login', {
                "deviceId": 0,
                "username": this.config.username,
                "password": this.config.password
            });
            token = res.data.data.token;
            this.cache.set('token', token);
        }
        return token;
    }
    // When module gets deleted
    async destroy() {
        this.log('debug', 'destroy');
        if (this.cache) {
            this.cache.close();
        }
        return;
    }
    getConfigFields() {
        return (0, config_1.GetConfigFields)();
    }
    async configUpdated(config) {
        this.config = config;
    }
}
exports.default = ModuleInstance;
//# sourceMappingURL=main.js.map