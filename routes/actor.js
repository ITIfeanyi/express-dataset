const express = require("express");
const router = express.Router();
const Actors = require("../controllers/actors");

// Routes related to actor.
router.get("/", Actors.getAllActors);
router.put("/", Actors.updateActor);
module.exports = router;
