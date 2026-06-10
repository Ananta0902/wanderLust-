const express = require("express");
const router = express.Router();

const aiController =require("../controllers/ai");

router.post("/chat",aiController.chatBot);

router.get("/trip-planner",(req,res)=>{
    res.render("ai/tripPlanner.ejs");
});
router.post("/trip-plan",aiController.tripPlanner);

 router.post("/global-chat",aiController.globalChat);

module.exports = router;