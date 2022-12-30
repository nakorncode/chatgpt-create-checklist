const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

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
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 3 // 3 days
  }
}));

app.use((req, res, next) => {
  res.locals.isLoggedIn = req.session.user ? true : false;
  res.locals.email = req.session.user ? req.session.user.email : '';
  next();
});

app.set('layout', 'layout.ejs');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  let checklists;
  if (req.session.isLoggedIn) {
    const userId = req.session.user.id;
    checklists = knex
      .select()
      .from('checklists')
      .where('userId', userId);
  } else {
    checklists = Promise.resolve([]);
  }

  checklists
    .then(checklists => res.render('index', { checklists }))
    .catch(error => console.error(error));
});

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists in the database
  knex('users').where('email', email).first().then(user => {
    if (user) {
      // Compare the passwords
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (isMatch) {
          // Password is correct
          req.session.user = user;
          req.session.isLoggedIn = true;
          req.session.save(() => {
            res.redirect('/');
          });
        } else {
          // Password is incorrect
          res.send('Incorrect password');
        }
      });
    } else {
      // User does not exist
      res.send('User does not exist');
    }
  }).catch(err => {
    console.error(err);
    res.send('An error occurred');
  });
});

app.get('/sign-up', (req, res) => {
  res.render('sign-up', { title: 'Sign Up' });
});

app.post('/sign-up', (req, res) => {
  const { email, password } = req.body;

  // Encrypt the password
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
      // Save the user to the database
      knex('users').insert({
        email: email,
        password: hash
      }).then(() => {
        res.send('Thank you for signing up!');
      }).catch(err => {
        console.error(err);
        res.send('An error occurred');
      });
    });
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});

app.post('/checklist', (req, res) => {
  if (!req.session.isLoggedIn) {
    return res.sendStatus(403);
  }

  const text = req.body.text;
  const userId = req.session.user.id;

  knex('checklists')
    .insert({ text, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.error(error));
});

app.post('/checked', (req, res) => {
  const { id, value } = req.body;

  knex('checklists')
    .where('id', id)
    .update({ checked: value })
    .then(() => res.sendStatus(200))
    .catch(error => console.error(error));
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
