module.exports = (sequelize, Sequelize) => {
	const Bills = sequelize.define(
		"Bills",
		{
			bill_name: {
				type: Sequelize.STRING,
			},
			bill_amount: {
				type: Sequelize.INTEGER,
			},
			bill_date: {
				type: Sequelize.INTEGER,
			},
			bill_paid: {
				type: Sequelize.INTEGER,
			},
			UserId: {
				type: Sequelize.INTEGER,
			},
		},
		{ timestamps: false }
	);
	return Bills;
};
