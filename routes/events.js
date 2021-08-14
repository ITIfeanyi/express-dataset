const express = require("express");
const router = express.Router();

// event controller
const Events = require("../controllers/events");
// Routes related to event

router.get("/", Events.getAllEvents);
router.post("/", Events.addEvent);
router.get("/actors/:actorID", Events.getByActor);
module.exports = router;
