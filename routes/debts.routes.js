module.exports = (app) => {
  const debts = require("../controllers/debts.controller");
  var router = require("express").Router();
  // Create a new savings goal
  router.post("/", debts.create);
  // Retrieve all savings goals
  router.get("/", debts.getAll);
  // Update a savings goal
  router.put("/:id", debts.update);
  // 	// Delete a savings goal with id
  router.delete("/:id", debts.delete);
  // Get categories
  router.get("/categories", debts.getCategories);
  app.use("/api/debts", router);
};
