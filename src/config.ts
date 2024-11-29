import { Regex, SomeCompanionConfigField } from '@companion-module/base'

export interface DeviceConfig {
    host: string
    username: string
    password: string
}

export function GetConfigFields(): SomeCompanionConfigField[] {
    return [
        {
            type: 'textinput',
            id: 'host',
            label: 'Target IP',
            default: '',
            width: 8,
            required: true,
            regex: Regex.IP,
        },
        {
            type: 'textinput',
            id: 'username',
            label: 'Username',
            default: '',
            required: true,
            width: 8,
        },
        {
            type: 'textinput',
            id: 'password',
            label: 'Password',
            default: '',
            required: true,
            width: 8,
        }
    ]
}
