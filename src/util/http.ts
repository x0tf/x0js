/**
 * @file http.ts
 * @fileoverview http request methods, kindly stolen from https://github.com/rednit-team/tinder.js
 */

// @ts-ignore
import c from '@aero/centra';
import { endpoints } from './Constants';

const headers = {
	'Authorization': ''
};

const req = async (token: string | null, route: string, method: string, body?: any): Promise<any> => {
	// we are using the start variable to measure the response time
	const start = Date.now();
	const URL = endpoints.ApiBaseUrl + route;
	const fetch = c(URL, method);
	headers['Authorization'] = `Bearer ${token}`
	fetch.reqHeaders = headers;
	const res = await fetch.body(body).send();
	if (res.statusCode >= 200 && res.statusCode < 300) {
		try {
			try {
				const p = res.json;
				p['responseTime'] = Date.now() - start
				return p;
			} catch (e) {
				return res.json;
			}
		} catch (e) {
			return { status: res.statusCode };
		}
	} else if (res.statusCode >= 400 && res.statusCode < 500) {
		throw res.text;
	} 
	// FIXME
	// else {
	// 	// console.log(`reattempting, status code: ${res.statusCode}`);
	// 	// TODO: find a better way to do this
	// 	return await req(token, route, method, body);
	// }
};

const get = async (token: string | null, route: string) => await req(token, route, 'GET');

const post = async (token: string, route: string, body?: any) => await req(token, route, 'POST', body);

// not needed at the moment
// const put = async (token: string, route: string, body: any) => await req(token, route, 'PUT', body);

const del = async (token: string, route: string) => await c(endpoints.ApiBaseUrl + route, 'DELETE').header('Authorization', `Bearer ${token}`).send();



export default {
	get,
	post,
	delete: del
};