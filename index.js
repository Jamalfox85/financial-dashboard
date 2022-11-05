const express = require("express");
const app = express();
const host = "http://localhost:8080";
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));

app.listen(port, () => {
  console.group(`App listening on ${host}:${PORT}`);
});
