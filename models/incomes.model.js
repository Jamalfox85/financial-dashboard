module.exports = (sequelize, Sequelize) => {
  const Incomes = sequelize.define(
    "Incomes",
    {
      name: {
        type: Sequelize.STRING,
      },
      amount: {
        type: Sequelize.INTEGER,
      },
      date: {
        type: Sequelize.INTEGER,
      },
      frequency: {
        type: Sequelize.INTEGER,
      },
      company: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.INTEGER,
      },
      start_date: {
        type: Sequelize.DATE,
      },
      end_date: {
        type: Sequelize.DATE,
      },
      userid: {
        type: Sequelize.INTEGER,
      },
    },
    { timestamps: false }
  );
  return Incomes;
};
