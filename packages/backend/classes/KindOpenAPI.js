const OpenAPIModule = require('./OpenAPI');

class KindOpenAPI extends OpenAPIModule.OpenAPI {
	#kindPublicUrl
	constructor() {
		super();
		this.#kindPublicUrl = `${super.Url}/kind?ServiceKey=${super.serviceKey}&_type=json&up_kind_cd=422400`;
	}

	get Url() {
		return this.#kindPublicUrl;
	}

	get request() {
		return super.request;
	}
}

exports.KindOpenAPI = KindOpenAPI;