const request = require('supertest')
const server = require('../server')

describe("Nyangterest Unit test!", () => {


	// Mock Object

	const body = {
		"items":
			[
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
				},
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
				},
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
				},
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
				},
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
				},
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
			]
	}

	const data = body.items;

	describe('Call filterArr func async / await', () => {

		test('Test colorCd function async/await', async () => {
			const result = await server.filterArr(data, "흰색");
			expect((result.length) > 0).toBeTruthy();
			expect(result[0].colorCd).toEqual("흰색")

		})

		test('Test sexCd function async/await', async () => {
			const result = await server.filterArr(data, "암컷");
			expect(result).toBeDefined()
			expect(result[0].sexCd).toBe("F")
		})

		test('Test kindCd function async/await', async () => {
			const result = await server.filterArr(data, "코리안숏헤어");
			expect(result).toBeDefined()
			expect(data).not.toBeNull();
			expect(result[0].kindCd).toContain("[고양이] 한국 고양이")
		})

		test('Test age async(error) / await', async () => {
			const result = await server.filterArr(data, "2018년생");
			console.log(result)
			const age = Promise.resolve(result[0].age)
			const error = Promise.reject('error')
			await expect(age).toBeDefined()
			await expect(age).not.toBeNull();
			await expect(age).resolves.toContain("2018(년생");
			await expect(error).rejects.toBe('error')

		})

	})

	describe('API test ,async / await', () => {

		const per = 6;
		const startDay = new Date(Date.now() + -1 * 24 * 3600 * 1000).toISOString().slice(0, 10).replace(/-/g, "");
		const endDay = new Date().toISOString().slice(0, 10).replace(/-/g, "");
		const str = "keyword"
		const url = `/page/${startDay}/${endDay}/${per}/000116/${str}`;

		test('Status code async / await ', async () => {
			const response = await request(server.app).get(url);
			expect(response.statusCode).toBe(200);
		})


		test('Default true or false', async () => {
			const response = await request(server.app).get(url);
			const body = response.body;
			expect.assertions(2);
			expect(data.length >= per).toBeTruthy();
			expect(data.length < per).toBeFalsy();
		})

		test('ToMatch default ', async () => {
			const response = await request(server.app).get(url);
			const body = response.body;
			expect(data.length).not.toBe(0)
			for (let i = 0; i < data.length; i++) {
				expect((data[i]).kindCd).toMatch(/고양이/)
				expect((data[i])).toBeDefined()
				expect((data[i])).not.toBeNull();
			}

		})

		test('Input keyword(한글) with async / await', async () => {
			const response = await request(server.app).get(`/page/20200405/20200412/72/000116/${encodeURI("치즈")}`);
			const body = response.body;
			expect.assertions(1);
			expect(data[0].colorCd).toContain("치즈");
		})

	})


})	