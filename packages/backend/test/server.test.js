
const request = require('supertest')
const app = require('../server')
const filter = require('../server')
// jest.mock('../server')

describe("Nyangterest Unit test!", () => {
	const startDay = new Date(Date.now() + -14 * 24 * 3600 * 1000).toISOString().slice(0, 10).replace(/-/g, "");
	const endDay = new Date().toISOString().slice(0, 10).replace(/-/g, "");
	const str = "keyword"
	// const url = `/page/${startDay}/${endDay}/${per}/000116/${str}`;

	const getData = async (url) => {
		try {
			const response = await request(app).get(url);
			const items = await response.body.items;
			return items;

		} catch (error) {
			console.log(error);
		}
	};

	// Mock Object
	const body = {
		"items":
			[[
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200519,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "U",
					"sexCd": "F",
					"weight": "1(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "검정,갈색",
					"happenDt": 20200519,
					"kindCd": "[고양이] 기타",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200519,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2017(년생)",
					"colorCd": "회색",
					"happenDt": 20200519,
					"kindCd": "[고양이] 러시안 블루",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.8(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200519,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200519,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "Y",
					"sexCd": "F",
					"weight": "3(Kg)"
				}
			],
			[
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200518,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "U",
					"sexCd": "F",
					"weight": "1(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "검정,갈색",
					"happenDt": 20200518,
					"kindCd": "[고양이] 기타",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200518,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2017(년생)",
					"colorCd": "회색",
					"happenDt": 20200518,
					"kindCd": "[고양이] 러시안 블루",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.8(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200518,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200518,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "Y",
					"sexCd": "F",
					"weight": "3(Kg)"
				}
			],
			[
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200517,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "U",
					"sexCd": "F",
					"weight": "1(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "검정,갈색",
					"happenDt": 20200517,
					"kindCd": "[고양이] 기타",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200517,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2017(년생)",
					"colorCd": "회색",
					"happenDt": 20200517,
					"kindCd": "[고양이] 러시안 블루",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.8(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200517,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200517,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "Y",
					"sexCd": "F",
					"weight": "3(Kg)"
				}
			],
			[
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200516,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "U",
					"sexCd": "F",
					"weight": "1(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "검정,갈색",
					"happenDt": 20200516,
					"kindCd": "[고양이] 기타",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200516,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2017(년생)",
					"colorCd": "회색",
					"happenDt": 20200516,
					"kindCd": "[고양이] 러시안 블루",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.8(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200516,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200516,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "Y",
					"sexCd": "F",
					"weight": "3(Kg)"
				}
			],
			[
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200515,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "U",
					"sexCd": "F",
					"weight": "1(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "검정,갈색",
					"happenDt": 20200515,
					"kindCd": "[고양이] 기타",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200515,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2017(년생)",
					"colorCd": "회색",
					"happenDt": 20200515,
					"kindCd": "[고양이] 러시안 블루",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.8(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200515,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200515,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "Y",
					"sexCd": "F",
					"weight": "3(Kg)"
				}
			],
			[
				{
					"age": "2020(년생)",
					"colorCd": "치즈노랑",
					"happenDt": 20200514,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "U",
					"sexCd": "F",
					"weight": "1(Kg)"
				},
				{
					"age": "2020(년생)",
					"colorCd": "검정,갈색",
					"happenDt": 20200514,
					"kindCd": "[고양이] 기타",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2018(년생)",
					"colorCd": "흰색",
					"happenDt": 20200514,
					"kindCd": "[고양이] 한국 고양이",
					"neuterYn": "N",
					"sexCd": "M",
					"weight": "0.4(Kg)"
				},
				{
					"age": "2017(년생)",
					"colorCd": "회색",
					"happenDt": 20200514,
					"kindCd": "[고양이] 러시안 블루",
					"neuterYn": "Y",
					"sexCd": "M",
					"weight": "0.8(Kg)"
				}
			]]
	}

	describe('GET request parameters test', () => {

		const per = 6;
		const data = body.items;


		test('Test function ', () => {
			filter.addArr = jest.fn();
			filter.filterItems = jest.fn()

			expect(filter.addArr.mock).toBeTruthy()
			expect(filter.filterItems.mock).toBeTruthy()
		})

		test('True and False test', () => {
			expect((data[0][0]).age.length > 0).toBeTruthy();
		})

		// 품종코드
		test('kind ', () => {

			for (let i = 0; i < data.length; i++) {
				expect(data).toBeDefined()
				expect(data).not.toBeNull();
				expect(data[i][0].kindCd).toContain("[고양이] 한국 고양이");
				expect((data[i][0]).length).not.toBe(0);
			}
		})

		// 예외처리 
		test('async(error) / await', async () => {
			const kindCd = Promise.resolve(data[0][1].kindCd)
			const error = Promise.reject('error')
			await expect(kindCd).toBeDefined()
			await expect(kindCd).not.toBeNull();
			await expect(kindCd).resolves.toContain("[고양이]");
			await expect(error).rejects.toBe('error')

		})


		// 고양이가 포함되어있는지 확인  
		test('TtoMatch default ', () => {
			expect(data[0][0].length).not.toBe(0)
			for (let i = 0; i < data.length; i++) {
				expect((data[i][0]).kindCd).toMatch(/고양이/)
				expect((data[i][0])).toBeDefined()
				expect((data[i][0])).not.toBeNull();
			}

		})

		test('Default', () => {
			expect.assertions(2);
			expect(data[0].length <= per).toBeTruthy();
			expect(data[0].length > per).toBeFalsy();
		})

		// test('Test search/kind', (done) => {
		// 	request(app)
		// 		.get('/search/kind')
		// 		.set('Content-Type', 'application/json')
		// 		.expect(200, done)
		// })
	})

})



