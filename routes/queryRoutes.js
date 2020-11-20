const express = require("express");
const router = express.Router();

const queryController = require("../controllers/queryController");

router.get("/consulta", queryController.getWithExec);

router.get('/lookup-mongo', queryController.aggregateMongoDB)
router.get('/lookup-mongoose', queryController.aggregateMongoose)

module.exports = router;
