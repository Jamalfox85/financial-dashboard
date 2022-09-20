module.exports = (app) => {
	const bills = require("../controllers/bills.controller");
	var router = require("express").Router();
	// Create a new savings goal
	router.post("/", bills.create);
	// Retrieve all savings goals
	router.get("/", bills.getAll);
	// Update a savings goal
	router.put("/:id", bills.update);
	// 	// Delete a savings goal with id
	router.delete("/:id", bills.delete);
	app.use("/api/bills", router);
};
