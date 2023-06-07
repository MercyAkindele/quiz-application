const router = require("express").Router();
const controller = require("./scores.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router
  .route("/")
  .get(controller.list)
  .post(controller.create)
  .all(methodNotAllowed);

router
  .route("/:score_id")
  .delete(controller.delete)
  .all(methodNotAllowed);

  module.exports = router;