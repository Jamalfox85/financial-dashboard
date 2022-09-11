module.exports = (app) => {
	const savings = require("../controllers/savings.controller");
	var router = require("express").Router();
	// Create a new savings goal
	router.post("/", savings.create);
	// Retrieve all savings goals
	router.get("/", savings.getAll);
	// Update a savings goal
	router.put("/:id", savings.update);
	// 	// Delete a savings goal with id
	router.delete("/:id", savings.delete);
	app.use("/api/savings", router);
};

// module.exports = app => {
// 	const tutorials = require("../controllers/tutorial.controller.js");
// 	var router = require("express").Router();
// 	// Create a new Tutorial
// 	router.post("/", tutorials.create);
// 	// Retrieve all Tutorials
// 	router.get("/", tutorials.findAll);
// 	// Retrieve all published Tutorials
// 	router.get("/published", tutorials.findAllPublished);
// 	// Retrieve a single Tutorial with id
// 	router.get("/:id", tutorials.findOne);
// 	// Update a Tutorial with id
// 	router.put("/:id", tutorials.update);
// 	// Delete a Tutorial with id
// 	router.delete("/:id", tutorials.delete);
// 	// Delete all Tutorials
// 	router.delete("/", tutorials.deleteAll);
// 	app.use('/api/tutorials', router);
//   };
