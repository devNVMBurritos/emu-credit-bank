// Middlewares
const isAuthenticated = require('./middleware/authentiuacation/is-authenticated');

// Handlers

//User
const login = require('./handlers/user/login');
const register = require('./handlers/user/register');
const search = require('./handlers/user/searches/by-username-or-email-user-search');

//Connection
const request = require('./handlers/connection/create');
const list = require('./handlers/connection/lists/all-connection-list');

//Consts
const createCost = require('./handlers/costs/create');
const confirm = require('./handlers/costs/confirm');

const getUnconfirmedCost = require('./handlers/costs/lists/unconfirmed-cost-list');
const getCreditList = require('./handlers/costs/lists/all-credit-cost-list');

const getbalance = require('./handlers/costs/calculations/user-balance-cost-calculation');


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
