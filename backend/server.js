const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(cors());

app.get('/', cors(), (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
