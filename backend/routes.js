// Middlewares
const isAuthenticated = require('./middleware/authentiuacation/is-authenticated');

// Handlers
const login = require('./handlers/user/login');
const register = require('./handlers/user/register');
const search = require('./handlers/user/search');

const request = require('./handlers/user/connection/request');
const list = require('./handlers/user/connection/list');

const createCost = require('./handlers/costs/create');
const getUnconfirmedCost = require('./handlers/costs/get-unconfirmed');
const confirm = require('./handlers/costs/confirm');

const getbalance = require('./handlers/costs/balance/get');
const getCreditList = require('./handlers/costs/debt/get-credit-list');

module.exports =  [
	//#region User paths
	{
		method: 'post',
		path: '/user/login',
		middleware: [],
		handler: login,
	},
	{
		method: 'post',
		path: '/user/register',
		middleware: [],
		handler: register,
	},
	{
		method: 'post',
		path: '/user/search',
		middleware: [isAuthenticated],
		handler: search,
	},
	//#endregion
	//#region Connection Paths
	{
		method: 'post',
		path: '/user/connection/request',
		middleware: [isAuthenticated],
		handler: request,
	},
	{
		method: 'post',
		path: '/user/connection/list',
		middleware: [isAuthenticated],
		handler: list,
	},
	//#endregion
	//#region Cost Paths
	{
		method: 'post',
		path: '/cost/create',
		middleware: [isAuthenticated],
		handler: createCost,
	},
	{
		method: 'post',
		path: '/cost/get-unconfirmed',
		middleware: [isAuthenticated],
		handler: getUnconfirmedCost,
	},
	{
		method: 'post',
		path: '/cost/confirm',
		middleware: [isAuthenticated],
		handler: confirm,
	},
	//#endregion
	//#region Balance Paths
	{
		method: 'post',
		path: '/cost/balance/get',
		middleware: [isAuthenticated],
		handler: getbalance,
	},
	{
		method: 'post',
		path: '/cost/debt/get-credit-list',
		middleware: [isAuthenticated],
		handler: getCreditList,
	},
	//#endregion
];
