const router = require("express").Router();

router.get("/", (req, res) => {
  res.send({ status: 200, data: "testing the backend data" });
});

router.get("/*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
});

module.exports = router;
