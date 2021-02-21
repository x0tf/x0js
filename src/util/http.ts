/**
 * @file http.ts
 * @fileoverview http request method(s), kindly stolen from https://github.com/rednit-team/tinder.js
 */


// @ts-ignore
import c from '@aero/centra';
import { endpoints } from './Constants';

const headers = {
	'User-agent': 'x0js/"https://github.com/x0tf/x0js"',
	'Authorization': ''
};

const req = async (token: string, route: string, method: string, body: any): Promise<any> => {
	const URL = endpoints.ApiBaseUrl + route;
	const fetch = c(URL, method);
	headers['Authorization'] = `Bearer ${token}`
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
		// TODO: find a better way to do this
		return await req(token, route, method, body);
	}
};

const get = async (token: string, route: string) => await req(token, route, '', '');

const post = async (token: string, route: string, body?: any) => await req(token, route, 'POST', body);

const put = async (token: string, route: string, body: any) => await req(token, route, 'PUT', body);

const del = async (token: string, route: string) => await req(token, route, 'DELETE', '');

export default {
	get,
	post,
	put,
	delete: del
};