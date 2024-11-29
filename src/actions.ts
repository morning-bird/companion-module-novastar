import { CompanionActionDefinitions, CompanionActionEvent } from '@companion-module/base'
import ModuleInstance from './main'
import Axios from 'axios'

export function getActionDefinitions(self: ModuleInstance): CompanionActionDefinitions {
	return {
		turnOn: {
			name: 'Turn On',
			options: [
				{
					id: 'presetId',
					type: 'number',
					label: 'Preset ID',
					default: 1,
					min: 1,
					max: 1000,
					required: true
				},
			],
			callback: async (action: CompanionActionEvent) => {
				const presetId = action.options.presetId!.toString()
				const instance = Axios.create({
					baseURL: `http://${self.config.host}`,
				})
				const token = await self.getToken()
				await instance.post(`/api/preset/play`, { "screenId": 0, "layoutTemplateId": 1, "presetId": +presetId, "deviceId": 0 }
					, {
						headers: {
							"token": token
						}
					})
			},
		}
	}
}
