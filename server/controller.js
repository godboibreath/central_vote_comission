const FileSystem = require('./file.system.module');

class Controller {
    async registartionOp(req, res) {
        try {
            const opsString = await FileSystem.readFile('./data/ops.json');
            const opsArray = !!opsString ? JSON.parse(opsString) : [];
            const { email, login, password } = req.body;
            if (opsArray.some((item) => item.email === email || item.login === login)) {
                res.status(403).json({ result: false, message: 'На данного ответственного представителя уже заведена учетная запись' }).end();
            } else {
                opsArray.push({ email, login, password });
                await FileSystem.writeFile('./data/ops.json', JSON.stringify(opsArray, null, 2));
                res.status(200).json({ result: true, }).end();
            }
        } catch (e) {
            console.error(`POST, /registration-op error: ${e.message}`);
            res.status(500).json({ result: false, message: 'Ошибка при регистрации ответственного представителя' }).end();
        }
    }
    async registrationVote(req, res) {
        try {
            const opsString = await FileSystem.readFile('./data/ops.json');
            const opsArray = !!opsString ? JSON.parse(opsString) : [];
            const votesString = await FileSystem.readFile('./data/votes.json');
            const votesArray = !!votesString ? JSON.parse(votesString) : [];
            const { voteName, votersCount, candidates, startDate, endDate, resultDate, emailSendType, file, login } = req.body;
            const opItem = opsArray.find((item) => item.login === login);
            if (!opItem) {
                res.status(400).json({ result: false, message: `Пользователь ${login} не зарегестрирован` }).end();
            } else {
                const voteOpItem = votesArray.find((item) => item.login === opItem.login);
                if (!voteOpItem) {
                    const votes = [{ voteName, votersCount, candidates, startDate, endDate, resultDate, emailSendType }];
                    votesArray.push({
                        login: opItem.login,
                        votes,
                    });
                    await FileSystem.writeFile('./data/votes.json', JSON.stringify(votesArray, null, 2));
                    res.status(200).json({ result: true, }).end();
                } else if (voteOpItem.votes.some((item) => item.voteName === voteName)) {
                    res.status(400).json({ result: false, message: `Голосование ${voteName} уже существует` }).end();
                } else {
                    voteOpItem.votes.push({ voteName, votersCount, candidates, startDate, endDate, resultDate, emailSendType });
                    await FileSystem.writeFile('./data/votes.json', JSON.stringify(votesArray, null, 2));
                    res.status(200).json({ result: true, }).end();
                };
            }
        } catch (e) {
            console.error(`POST, /registration-vote error: ${e.message}`);
            res.status(500).json({ result: false, message: 'Ошибка при регистрации голосования' }).end();
        }
    }

    async login(req, res) {
        try {
            const opsString = await FileSystem.readFile('./data/ops.json');
            const opsArray = !!opsString ? JSON.parse(opsString) : [];
            const { login, password } = req.body;
            if (opsArray.some((item) => item.login === login && item.password === password)) {
                res.status(200).json({ result: true, }).end();
            }
        } catch (e) {
            console.error(`POST, /login error: ${e.message}`);
            res.status(500).json({ result: false, message: 'Ошибка при входе' }).end();
        }
    }

    async loginVoter(req, res) {
        try {
            res.status(200).json({ result: true }).end();
        } catch (e) {
            console.error(`POST, /login-voter error: ${e.message}`);
            res.status(500).json({ result: false }).end();
        }
    }
}

module.exports = new Controller()