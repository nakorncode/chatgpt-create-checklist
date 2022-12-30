const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();

app.use(express.static('public'));
app.use(expressLayouts);

app.set('layout', 'layout.ejs');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index', { title: 'My Checklist' });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
