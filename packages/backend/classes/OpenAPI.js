const fetch = require("node-fetch");

class OpenAPI {
	#url
	#serviceKey

	constructor() {
		this.#url = "http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc";
		this.#serviceKey = process.env.SERVICE_KEY;
	}

	get Url() {
		return this.#url;
	}

	get serviceKey() {
		return this.#serviceKey;
	}

	get request() {
		return ( async () => {
			let result = {};
			try {
				console.log(this.Url);	// maybe call override method
				const response = await fetch(this.Url);
				const json = await response.json();
				result = await json.response.body;

			} catch (error) {
				console.log(error);
				result = error;
			}
			return result;
		})();
	}
}

exports.OpenAPI = OpenAPI;