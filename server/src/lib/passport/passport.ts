import dotenv from "dotenv";
export var passport = require("passport");
dotenv.config();
var JwtStrategy = require("passport-jwt").Strategy,
	ExtractJwt = require("passport-jwt").ExtractJwt;
var sha256 = require("js-sha256").sha256;
export const Hash = sha256
	.create()
	.update(`${process.env.SECRET_KEY}|${process.env.OP_CODE}`)
	.hex();

export const creds = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	jsonWebTokenOptions: {
		op: process.env.OP_CODE,
	},
	issuer: process.env.ISSUER,
	audience: process.env.AUDIENCE,
	secretOrKey: Hash,
};

passport.use(
	new JwtStrategy(creds, (jwt_payload: any, done: any) => {
		return done(null, true);
	})
);

export const Auth = passport.authenticate("jwt", {
	session: false,
	failureRedirect: `/unauthorized`,
});
