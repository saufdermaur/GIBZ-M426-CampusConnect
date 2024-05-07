const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;

const accountRoutes = require('./routes/accounts');

app.use(cors());
app.use(express.json());

app.use('/api/account', accountRoutes);

app.get('/', cors(), (req, res) => {
    res.status(200)
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
