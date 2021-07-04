const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");

const router = require("./routes");

const app = express();

// const formatsLogger = app.get("env") === "development" ? "dev" : "short";

// app.use(logger(formatsLogger));
app.use(cors());
// app.use(express.json());


app.use("/api/contacts", router.contacts);
app.use("/api/users", router.users);
app.use(express.static(path.join(__dirname, "public")));

app.use((_, res, next) => {
  res.status(404).json({
    status: "error",
    code: "404",
    message: "Nod Found",
  });
});

app.use((error, _, res, __) => {
  const { code = 500, message = "Server error" } = error;
  res.status(code).json({
    status: "fail",
    code,
    message,
  });
});

module.exports = app;
