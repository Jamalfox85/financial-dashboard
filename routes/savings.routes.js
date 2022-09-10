module.exports = (app) => {
	const savings = require("../controllers/savings.controller");
	var router = require("express").Router();
	// Create a new User
	// router.post("/", savings.create);
	// Retrieve all savings
	router.get("/", savings.getAll);
	app.use("/api/savings", router);
};
