const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const env = require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

// SESSION
const store = new MongoDBStore({ uri: MONGODB_URI, collection: "sessions" });

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		cookie: { domain: false },
		store,
	})
);
// CROS
app.use(
	cors({
		origin: process.env.CORSS_ORIGIN.split(","),
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);

// COOKIE PARSER
app.use(cookieParser());

// BODY PARSER
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

// ROUTER
const mainRouter = require("./routes/index");
app.use("/api", mainRouter);

// ERROR HANDLER
app.use((err, req, res, next) => {
	let statusCode = err.status || 500;
	console.error(err);
	return res.status(statusCode).json(err.toString());
});

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		app.listen(process.env.PORT || 4000);
		console.log(`Server is running on port ${process.env.PORT || 4000}`);
	})
	.catch((err) => {
		console.log(err);
	});
