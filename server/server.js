const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Test route
app.get('/', (req, res) => {
  res.send('Finance Tracker API Running');
});

// Routes
app.use(
  '/api/auth',
  require('./routes/authRoutes')
);

app.use(
  '/api/expenses',
  require('./routes/expenseRoutes')
);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running on port ${PORT}`
  );
});