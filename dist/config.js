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
            type: 'textinput',
            id: 'username',
            label: 'Username',
            width: 8,
        },
        {
            type: 'textinput',
            id: 'password',
            label: 'Password',
            width: 8,
        }
    ];
}
exports.GetConfigFields = GetConfigFields;
//# sourceMappingURL=config.js.map