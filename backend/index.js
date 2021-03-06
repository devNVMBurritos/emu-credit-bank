// Module imports
const bodyParser = require('body-parser');
const selfsigned = require('selfsigned');
const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const https = require('https');
const cors = require('cors');
const fs = require('fs');

// Models
require('./models/user/user');
require('./models/user/connection/request');
require('./models/cost/cost');
// App setup
dotenv.config();
const app = express();
// Cache externally fetched information for future invocations

var corsOptions = { origin: process.env.CorsOrigins?process.env.CorsOrigins.split(','):process.env.CorsOrigin };
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Database Connection
mongoose.connect(process.env.MongoURI);

// Routes
const routes = require('./routes.js');

routes.forEach((route) => {
	const { method, path, middleware, handler } = route;
	app[method](path, ...middleware, handler);
});

// Server setup
var server;
if (process.env.Environment === 'PRODUCTION') {
	var attrs = [{ name: 'commonName', value: process.env.ProductionDomain }];
	var pems;
	if (fs.existsSync(process.env.CertPath) && fs.existsSync(process.env.PrivateKeyPath)) {	
		pems = { private: fs.readFileSync(process.env.PrivateKeyPath), cert: fs.readFileSync(process.env.CertPath) }; }
	else  { pems = selfsigned.generate(attrs, { days: 365, keySize: 2048, algorithm: 'SHA256'}); }

	server = https.createServer({key: pems.private, cert: pems.cert }, app).listen(process.env.PORT || 3306, () => {
		console.log('server is running on:' + server.address().port + ' in PRODUCTION mode!');
	});
} else {
	server = app.listen(process.env.PORT || 3306, () => {
		console.log('server is running on:' + server.address().port);
	});
}

exports.modules = server;