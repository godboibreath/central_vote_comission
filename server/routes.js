const Router = require("express");
const Controller = require('./controller');

const router = Router();

router.post("/registartion-op", Controller.registartionOp);
router.post("/registartion-vote", Controller.registrationVote);
router.post("/login", Controller.login);
router.post("/login-voter", Controller.loginVoter);

module.exports = router;
