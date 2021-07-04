const mongoose = require("mongoose");

require("dotenv").config();

const app = require("../app");

const { DB_HOST } = process.env;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    const port = PORT || 3000;
    app.listen(port);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
