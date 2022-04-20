const login = require('./handlers/user/login');
const register = require('./handlers/user/register');

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
	//#endregion
];
