"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionDefinitions = void 0;
const axios_1 = __importDefault(require("axios"));
function getActionDefinitions(self) {
    return {
        turnOn: {
            name: 'Load Preset',
            options: [
                {
                    id: 'presetId',
                    type: 'number',
                    label: 'Preset ID',
                    default: 0,
                    min: 0,
                    max: 1000,
                    required: true
                },
            ],
            callback: async (action) => {
                const presetId = action.options.presetId.toString();
                const instance = axios_1.default.create({
                    baseURL: `http://${self.config.host}`,
                });
                const token = await self.getToken();
                const res = await instance.post(`/api/preset/play`, { "screenId": 0, "layoutTemplateId": 1, "presetId": +presetId, "deviceId": 0 }, {
                    headers: {
                        "token": token
                    }
                });
                self.log('debug', res.data);
            },
        }
    };
}
exports.getActionDefinitions = getActionDefinitions;
//# sourceMappingURL=actions.js.map