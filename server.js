const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
  res.render('form');
});

app.post('/submit-form', async (req, res) => {
  const { name, email } = req.body;
  try {
    const response = await axios.post('http://backend:5000/submit', { name, email });
    res.send(response.data.message);
  } catch (error) {
    res.status(500).send('Error contacting backend');
  }
});

app.listen(3000, () => {
  console.log('Frontend running on port 3000');
});
