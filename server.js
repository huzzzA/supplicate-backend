const express = require('express');
const cors = require('cors');
require('dotenv').config();
const duaRoutes = require('./routes/duaRoutes')
const duaRabbanaRoutes = require('./routes/rabbanaduaRoutes');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');


console.log('DATABASE_URL:', process.env.DATABASE_URL);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // parses JSON request body
app.use(express.urlencoded({ extended: true })); // parses URL-encoded data

// Example route
app.get('/api', (req, res) => {
  res.send('API is working!');
});


// routes
app.use('/api/duas', duaRoutes);
app.use('/api/rabbanaduas', duaRabbanaRoutes);

//auth
app.use('/api/auth', authRoutes);


app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}`);
});