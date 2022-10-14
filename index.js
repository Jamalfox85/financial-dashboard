const express = require("express");
const app = express();
const host = "https://financial-dashboard-pi.vercel.app/";
const port = 3000;

app.use(express.static("public"));

app.listen(port, () => {
  console.group(`App listening on ${host}:${port}`);
});
