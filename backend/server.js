const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 3000;

const userRoutes = require('./routes/users');

app.use(cors());
app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', cors(), (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
