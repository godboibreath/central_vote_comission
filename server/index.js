const express = require("express");
const cors = require("cors");

const router = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', router);

app.listen(3000, () => {
    console.log('Server has started on 3000 port');
});