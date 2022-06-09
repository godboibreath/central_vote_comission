const Router = require("express");
const Controller = require('./controller');

const router = Router();

router.post("/registartion-op", Controller.registartionOp);
router.post("/registartion-vote", Controller.registrationVote);

module.exports = router;
