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
            width: 8,
            regex: Regex.IP,
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
    ]
}
