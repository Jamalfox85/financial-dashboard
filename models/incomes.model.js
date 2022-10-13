module.exports = (sequelize, Sequelize) => {
  const Incomes = sequelize.define(
    "Incomes",
    {
      incomeName: {
        type: Sequelize.STRING,
      },
      incomeAmount: {
        type: Sequelize.INTEGER,
      },
      UserId: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false }
  );
  return Incomes;
};
