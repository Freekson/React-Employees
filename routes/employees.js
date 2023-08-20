const express = require("express");
const router = express.Router();
const { all, add, find, remove, edit } = require("../controllers/employees");
const { auth } = require("../middleware/auth");

router.get("/", auth, all);

router.get("/:id", auth, find);

router.post("/add", auth, add);

router.delete("/remove/:id", auth, remove);

router.put("/edit/:id", auth, edit);

module.exports = router;
