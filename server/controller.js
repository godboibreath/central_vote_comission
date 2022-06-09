const { opsArray } = require('./variables');

class Controller {
    async registartionOp(req, res) {
        try {
            const { email, login, password } = req.body;
            if (opsArray.some((item) => item.email === email || item.login === login)) {
                res.status(403).json({ result: false, message: 'На данного ответственного представителя уже заведена учетная запись' }).end();
            } else {
                opsArray.push({ email, login, password });
                res.status(403).json({ result: true, }).end();
            }
        } catch (e) {
            console.error(`POST, /registration-op error: ${e.message}`)
        }
    }
    async registrationVote(req, res) {
        try {
            const { voteName, votersCount, candidates, startDate, endDate, resultDate, emailSendType, file } = req.body;
            console.log(req.body);
        } catch (e) {
            console.error(`POST, /registration-op error: ${e.message}`)
        }
    }
}

module.exports = new Controller()