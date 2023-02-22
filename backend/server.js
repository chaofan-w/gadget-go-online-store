const express = require("express");
const morgan = require("morgan");
const app = express();
const port = process.env.PORT || 8000;

app
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))
  .use(express.urlencoded({ extended: false }))
  .use(require("./routes"))

  .listen(port, () => {
    console.log(`The backend server is listening on port ${port}`);
  });
