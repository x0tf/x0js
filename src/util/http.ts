import { endpoints } from './Constants';
// @ts-ignore
import * as c from '@aero/centra';

const { baseUrl } = endpoints;

const headers = {
	'User-agent': '',
	Accept: 'application/json',
	'Auth': ''
};

const setToken = (authToken: string) => {
	headers['Auth'] = authToken;
};

const req = async (route: string, method: string, body: any): Promise<any> => {
	route = baseUrl + route;
	const fetch = c(route, method);
	fetch.reqHeaders = headers;
	const res = await fetch.body(body).send();
	if (res.statusCode >= 200 && res.statusCode < 300) {
		try {
			return res.json;
		} catch {
			return { status: res.statusCode };
		}
	} else if (res.statusCode >= 400 && res.statusCode < 500) {
		throw res.text;
	} else {
		console.log(`reattempting, status code: ${res.statusCode}`);
		return await req(route, method, body);
	}
};

const get = async (route: string) => await req(route, '', '');

const post = async (route: string, body: any) => await req(route, 'POST', body);

const put = async (route: string, body: any) => await req(route, 'PUT', body);

const del = async (route: string) => await req(route, 'DELETE', '');

export default {
	setToken,
	get,
	post,
	put,
	delete: del
};