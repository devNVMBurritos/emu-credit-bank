// Middlewares
const isAuthenticated = require('./middleware/authentiuacation/is-authenticated');

// Handlers

//User
const login = require('./handlers/user/login');
const register = require('./handlers/user/register');
const searchUsersByUsernameOrEmail = require('./handlers/user/searches/by-username-or-email-user-search');

//Connection
const createConnection = require('./handlers/connection/create');
const listAllConnection = require('./handlers/connection/lists/all-connection-list');

//Consts
const createCost = require('./handlers/cost/create');
const confirmCost = require('./handlers/cost/confirm');

const listUnconfirmedCosts = require('./handlers/cost/lists/unconfirmed-cost-list');
const listAllCreditCosts = require('./handlers/cost/lists/all-credit-cost-list');

const calculateUserBalanceCost = require('./handlers/cost/calculations/user-balance-cost-calculation');


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
		path: '/user/searches/by-username-or-email-user-search',
		middleware: [isAuthenticated],
		handler: searchUsersByUsernameOrEmail,
	},
	//#endregion
	//#region Connection Paths
	{
		method: 'post',
		path: '/connection/create',
		middleware: [isAuthenticated],
		handler: createConnection,
	},
	{
		method: 'post',
		path: '/connection/lists/all-connection-list',
		middleware: [isAuthenticated],
		handler: listAllConnection,
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
		path: '/cost/lists/unconfirmed-cost-list',
		middleware: [isAuthenticated],
		handler: listUnconfirmedCosts,
	},
	{
		method: 'post',
		path: '/cost/confirm',
		middleware: [isAuthenticated],
		handler: confirmCost,
	},
	{
		method: 'post',
		path: '/cost/calculations/user-balance-cost-calculation',
		middleware: [isAuthenticated],
		handler: calculateUserBalanceCost,
	},
	{
		method: 'post',
		path: '/cost/lists/all-credit-cost-list',
		middleware: [isAuthenticated],
		handler: listAllCreditCosts,
	},
	//#endregion
];
