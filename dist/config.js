"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetConfigFields = void 0;
const base_1 = require("@companion-module/base");
function GetConfigFields() {
    return [
        {
            type: 'textinput',
            id: 'host',
            label: 'Target IP',
            width: 8,
            regex: base_1.Regex.IP,
        },
        {
            type: 'number',
            id: 'port',
            label: 'Target Port',
            width: 4,
            default: 22,
            min: 1,
            max: 65535,
        },
        {
            type: 'textinput',
            id: 'username',
            label: 'Username',
            default: 'apc',
            width: 8,
        },
        {
            type: 'textinput',
            id: 'password',
            label: 'Password',
            width: 8,
        },
        {
            type: 'number',
            id: 'pullingTime',
            label: 'Set interval to pull data in msec',
            width: 8,
            min: 5000,
            max: 86400000,
            default: 60000,
        },
    ];
}
exports.GetConfigFields = GetConfigFields;
//# sourceMappingURL=config.js.map