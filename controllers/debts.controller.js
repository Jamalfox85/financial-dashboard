const { sequelize } = require("../models");
const db = require("../models");
const Debts = db.debts;
const Op = db.Sequelize.Op;

// // Create and Save a new Tutorial
// exports.create = (req, res) => {
// 	const goal = {
// 		LastName: req.body.LastName,
// 		firstName: req.body.FirstName,
// 		Email: req.body.Email,
// 		Pass: req.body.Pass,
// 	};
// 	Users.create(user)
// 		.then((data) => {
// 			res.send(data);
// 		})
// 		.catch((err) => {
// 			res.status(500).send({
// 				message: err.message || "Some error occured while adding this user.",
// 			});
// 		});
// };

exports.getAll = (req, res) => {
  Debts.findAll().then((data) => {
    console.log("ping");
    res.send(data);
  });
};

exports.create = (req, res) => {
  let debt = {
    debt_name: req.body.debt_name,
    debt_amount: req.body.debt_amount,
    debt_limit: req.body.debt_limit,
    debt_category: req.body.debt_category,
    UserId: 1,
  };
  Debts.create(debt).then((data) => {
    res.send(data);
  });
};

// Find a single Tutorial with an id
exports.findONe = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  let id = req.params.id;
  Debts.update(req.body, { where: { id: id } });
};

// Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
  let deletedId = req.params.id;
  Debts.destroy({ where: { id: deletedId } });
};

// Delete all tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published tutorials
exports.findAllPublished = (req, res) => {};

// Find all categories of debt
exports.getCategories = (req, res) => {
  sequelize
    .query("SELECT DISTINCT debt_category FROM Debts", {
      type: sequelize.QueryTypes.SELECT,
    })
    .then((categories) => {
      return res.status(201).send({ categories });
    });
};
