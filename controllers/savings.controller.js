const db = require("../models");
const Savings = db.savings;
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
	Savings.findAll().then((data) => {
		res.send(data);
	});
};

exports.create = (req, res) => {
	let goal = {
		savings_name: req.body.savings_name,
		goal_amount: req.body.goal_amount,
		current_amount: req.body.current_amount,
		Userid: 1,
	};
	Savings.create(goal).then((data) => {
		res.send(data);
	});
};

// Find a single Tutorial with an id
exports.findONe = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
	let id = req.params.id;
	Savings.update(req.body, { where: { id: id } });
};

// Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
	let deletedId = req.params.id;
	Savings.destroy({ where: { id: deletedId } });
};

// Delete all tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published tutorials
exports.findAllPublished = (req, res) => {};
