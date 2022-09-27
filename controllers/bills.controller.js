const db = require("../models");
const Bills = db.bills;
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
  Bills.findAll().then((data) => {
    res.send(data);
  });
};

exports.create = (req, res) => {
  let goal = {
    bill_name: req.body.bill_name,
    bill_amount: req.body.bill_amount,
    bill_date: req.body.bill_date,
    bill_paid: req.body.bill_paid,
    Userid: 1,
  };
  Bills.create(goal).then((data) => {
    res.send(data);
  });
};

// Find a single Tutorial with an id
exports.findONe = (req, res) => {};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  let id = req.params.id;
  Bills.update(req.body, { where: { id: id } });
};

// Delete a tutorial with the specified id in the request
exports.delete = (req, res) => {
  let deletedId = req.params.id;
  Bills.destroy({ where: { id: deletedId } });
};

// Delete all tutorials from the database.
exports.deleteAll = (req, res) => {};

// Find all published tutorials
exports.findAllPublished = (req, res) => {};
