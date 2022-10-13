module.exports = (app) => {
  const incomes = require("../controllers/incomes.controller");
  var router = require("express").Router();
  // Create a new savings goal
  router.post("/", incomes.create);
  // Retrieve all savings goals
  router.get("/", incomes.getAll);
  // Update a savings goal
  router.put("/:id", incomes.update);
  // 	// Delete a savings goal with id
  router.delete("/:id", incomes.delete);
  app.use("/api/incomes", router);
};
