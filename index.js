import helmet from "helmet";
import compression from "compression";
import sslRedirect from "heroku-ssl-redirect";
import path from "path";
import csrf from "csurf";
import cookieParser from "cookie-parser";

const express = require("express");
const app = express();
const host = "https://financial-dashboard-pi.vercel.app/";
const PORT = process.env.PORT || 8080;

app.use(sslRedirect());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use("/api", cookieParser());
app.use("/api", csrf({ cookie: true }));
app.use("/api", (req, res, next) => {
  res.cookie("XSRF-TOKEN", req.csrfToken());
  next();
});
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../")));
app.get("/*", function (_, res) {
  res.sendFile(path.join(__dirname, "../", "index.html"));
});

// app.listen(port, () => {
//   console.group(`App listening on ${host}:${PORT}`);
// });

app.listen(process.env["PORT"] || 3002, () => console.log("Server started"));
