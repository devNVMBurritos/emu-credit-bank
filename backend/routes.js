// Middlewares
const isAuthenticated = require('./middleware/authentiuacation/is-authenticated');

// Handlers
const login = require('./handlers/user/login');
const register = require('./handlers/user/register');
const search = require('./handlers/user/search');

const request = require('./handlers/user/connection/request');

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
	//#region Connections
	{
		method: 'post',
		path: '/user/connection/request',
		middleware: [isAuthenticated],
		handler: request,
	},
	//#endregion
	//#endregion
];
