const express = require("express");
const router = express.Router();

const controller = require("../controllers/scholarshipController");

router.get("/", controller.getAll);
router.get("/search", controller.search);
router.put("/:id/follow", controller.follow);

module.exports = router;