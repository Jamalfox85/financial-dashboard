module.exports = (sequelize, Sequelize) => {
	const Savings = sequelize.define(
		"Savings",
		{
			savings_name: {
				type: Sequelize.STRING,
			},
			goal_amount: {
				type: Sequelize.INTEGER,
			},
			current_amount: {
				type: Sequelize.INTEGER,
			},
			Userid: {
				type: Sequelize.INTEGER,
			},
		},
		{ timestamps: false }
	);
	return Savings;
};
