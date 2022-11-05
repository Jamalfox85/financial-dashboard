module.exports = (sequelize, Sequelize) => {
  const Bills = sequelize.define(
    "Bills",
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
      status: {
        type: Sequelize.INTEGER,
      },
      userid: {
        type: Sequelize.INTEGER,
      },
      frequency: {
        type: Sequelize.INTEGER,
      },
      company: {
        type: Sequelize.STRING,
      },
    },
    { timestamps: false }
  );
  return Bills;
};
