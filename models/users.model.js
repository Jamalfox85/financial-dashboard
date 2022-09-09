module.exports = (sequelize, Sequelize) => {
	const Users = sequelize.define(
		"Users",
		{
			LastName: {
				type: Sequelize.STRING,
			},
			FirstName: {
				type: Sequelize.STRING,
			},
			Email: {
				type: Sequelize.STRING,
			},
			Pass: {
				type: Sequelize.STRING,
			},
		},
		{ timestamps: false }
	);
	return Users;
};
