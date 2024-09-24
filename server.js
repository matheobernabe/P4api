require('dotenv').config();
const express = require('express');
const app = express();
const userRoutes = require('./routes/user_Routes');

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'API Puissance 4 est opérationnelle !' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
