const express = require('express');
const path = require('path');

const app = express();

const isUser = () => false;

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `/views/${name}`));
  };
  next();
});

app.use('/user', (req, res, next) => {
  if (isUser()) next();
  else res.send('Sign in!');
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.show('home.html');
});

app.get('/about', (req, res) => {
  res.show('about.html');
});

app.get('/user/settings', (req, res) => {
  res.send('settings');
});

app.get('/user/panel', (req, res) => {
  res.send('panel');
});

app.use((req, res) => {
  res.status(404).show('forbidden.html');
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
