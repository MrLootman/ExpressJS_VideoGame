const express = require("express");

const router = express.Router();

const { browse, add } = require("../controllers/gameActions");

router.get("/hello", (req, res) => {
    res.send("Coucou les plus beaux");
})

router.get("/", browse);
router.post("/", add);

module.exports = router;