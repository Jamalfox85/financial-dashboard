module.exports = (app) => {
	const users = require("../controllers/users.controller");
	var router = require("express").Router();
	// Create a new User
	router.post("/", users.create);
	// Retrieve all Users
	router.get("/", users.getAll);
	app.use("/api/users", router);
};
