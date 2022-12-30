const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const app = express();

const knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: './checklist.db'
  },
  useNullAsDefault: true
});

app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({ extended: true }));

app.set('layout', 'layout.ejs');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'My Checklist' });
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up', { title: 'Sign Up' });
});

app.post('/sign-up', (req, res) => {
  console.log(req.body);
  res.send('Thank you for signing up!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
