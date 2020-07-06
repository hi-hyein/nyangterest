const OpenAPIModule = require('./OpenAPI');

// upkind enum
// https://www.data.go.kr/data/15001096/openapi.do
// select to '유기동물 정보를 조회' in select box item
const UPKIND = {
	DOG: 417000,
	CAT: 422400,
	ETC: 429900
};

class abandonmentPublicOpenAPI extends OpenAPIModule.OpenAPI {
	#abandonmentPublicUrl
	constructor(bgnde, endde, kind) {
		super();
		this.#abandonmentPublicUrl = `${super.Url}/abandonmentPublic?ServiceKey=${super.serviceKey}&_type=json&bgnde=${bgnde}&endde=${endde}&numOfRows=1000000&upkind=${UPKIND.CAT}`;
		if (kind !== "000116") {
			this.#abandonmentPublicUrl += `&kind=${kind}`;
		}
	}

	get Url() {
		return this.#abandonmentPublicUrl;
	}

	get request() {
		return super.request;
	}
}

exports.abandonmentPublicOpenAPI = abandonmentPublicOpenAPI;