const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
	origin: "http://localhost:8080",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
	res.json({ message: "Welcome to jamal's application." });
});
require("./routes/user.routes")(app);
require("./routes/savings.routes")(app);
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
	console.log("Server is running on port ", PORT);
});

const db = require("./models");
db.sequelize.sync();
// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and re-sync db.");
// });
