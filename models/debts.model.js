module.exports = (sequelize, Sequelize) => {
  const Debts = sequelize.define(
    "Debts",
    {
      debt_name: {
        type: Sequelize.STRING,
      },
      debt_amount: {
        type: Sequelize.INTEGER,
      },
      debt_limit: {
        type: Sequelize.INTEGER,
      },
      debt_category: {
        type: Sequelize.STRING,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false }
  );
  return Debts;
};
