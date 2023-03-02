import dotenv from "dotenv";
dotenv.config();
import { Server as SocketServer } from "socket.io";
import mongoose from "mongoose";
import fs from "node:fs";
import jwtDecode from "jwt-decode";
import { passport, Hash, creds, Auth } from "./lib/passport/passport";
import axios from "axios";
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const socket = require("socket.io");
const path = require("path");
const http = require("node:http");
const sign = require("jwt-encode");

const secret = process.env.SECRET_KEY;
mongoose.set("strictQuery", true);

//.Server(app,httpOptions)
mongoose.connect(process.env.MONGOSTR as string).then(() => {
	const httpOptions: any = {};
	const app = express();
	app.use(express.json());
	app.use(cors(httpOptions));

	const server = http.createServer(app, httpOptions);
	const io = new SocketServer(server, httpOptions);
	const port = process.env.PORT;

	app.use(
		session({
			secret: secret,
			resave: true,
			saveUninitialized: true,
		})
	);
	app.use(passport.initialize());
	app.use(passport.session());

	app.use("/api/default", require("./modules/plugins/default"));

	server.listen(port, () => {
		console.log(`App listening at http://localhost:${port}`);
	});

	app.get("/unauthorized", (req: any, res: any) => {
		res.send("You are unauthorized to use this");
	});

	app.get("/", Auth, (req: any, res: any) => {
		console.log("Hello World");
		res.send("Hello User");
	});

	app.get("/api/createplayer", (req: any, res: any) => {
		// axios.post();
	});

	app.get("/api/encode", (req: any, res: any) => {
		//Search MongoDB for user data

		//Set User data and prepare for JWT encode
		const data = {
			op: process.env.OP_CODE,
			iss: process.env.ISSUER,
			aud: process.env.AUDIENCE,
			sub: "1234567890",
			name: "John Doe",
			iat: Math.floor(new Date().getTime() / 1000),
			exp: Math.floor(new Date().getTime() / 1000 + 30),
		};

		//Sign User data with Hash key as JWT
		const jwt = sign(data, Hash);

		//Send User JWT Token
		res.send(jwt);
	});

	app.get("/api/refresh", (req: any, res: any) => {
		const data = {
			op: process.env.OP_CODE,
			iss: process.env.ISSUER,
			aud: process.env.AUDIENCE,
			sub: "1234567890",
			name: "John Doe",
			iat: Math.floor(new Date().getTime() / 1000),
			exp: Math.floor(new Date().getTime() / 1000 + 3600),
		};
		const jwt = sign(data, secret);
		res.send(jwt);
	});

	app.get("/api/date", (req: any, res: any) => {
		console.log(Math.floor(new Date().getTime() / 1000));
	});
});
