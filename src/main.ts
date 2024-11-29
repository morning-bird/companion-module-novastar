import { InstanceBase, InstanceStatus, SomeCompanionConfigField } from '@companion-module/base'
import { DeviceConfig, GetConfigFields } from './config'
import { getActionDefinitions } from './actions'
import NodeCache from "node-cache"
import Axios from "axios"

export default class ModuleInstance extends InstanceBase<DeviceConfig> {
	private cache: NodeCache = new NodeCache()
	public config: DeviceConfig = {
		host: '',
		username: '',
		password: '',
	}

	constructor(internal: unknown) {
		super(internal)
	}


	public async init(config: DeviceConfig): Promise<void> {
		this.updateStatus(InstanceStatus.Connecting);
		this.config = config
		this.cache = new NodeCache({
			stdTTL: 180,
			deleteOnExpire: true,

		})
		try {
			await this.configUpdated(this.config)
			await this.getToken()
			this.setActionDefinitions(getActionDefinitions(this));
			this.updateStatus(InstanceStatus.Ok);
		} catch (exc) {
			this.updateStatus(InstanceStatus.ConnectionFailure);
		}
	}

	public async getToken(): Promise<string> {
		let token = this.cache.get<string>('token')
		if (!token) {
			const instance = Axios.create({
				baseURL: `http://${this.config.host}`,
			})
			const res = await instance.post('/api/user/login', {
				"deviceId": 0,
				"username": this.config.username,
				"password": this.config.password
			})
			token = res.data.data.token as string
			this.cache.set<string>('token', token)
		}
		return token;
	}


	// When module gets deleted
	public async destroy(): Promise<void> {
		this.log('debug', 'destroy')
		if (this.cache) {
			this.cache.close()
		}
		return
	}

	public getConfigFields(): SomeCompanionConfigField[] {
		return GetConfigFields()
	}

	public async configUpdated(config: DeviceConfig): Promise<void> {
		this.config = config
	}
}