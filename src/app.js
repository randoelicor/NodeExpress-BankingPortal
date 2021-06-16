const fs = require('fs');
const path = require('path');
const express = require('express');
const { json } = require('express');
const { accounts, users, writeJSON } = require('./data.js');

const app = express();

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(express.static('./src/public'));
app.use(express.urlencoded({ extended: true }));

// const accountData = fs.readFileSync('src/json/accounts.json', { encoding: 'utf8' });
// const accounts = JSON.parse(accountData);

// const userData = fs.readFileSync('src/json/users.json', { encoding: 'utf8' });
// const users = JSON.parse(userData);

app.get('/', (req, res) => {
  res.render('index', { title: 'Account Summary', accounts: accounts });
});

app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings });
});

app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking });
});

app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit });
});

app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] });
});

app.get('/transfer', (req, res) => {
  res.render('transfer');
});

app.get('/payment', (req, res) => {
  res.render('payment', { account: accounts.credit });
});

app.post('/transfer', (req, res) => {
  accounts[req.body.from].balance = parseInt(accounts[req.body.from].balance) - parseInt(req.body.amount);
  accounts[req.body.to].balance = parseInt(accounts[req.body.to].balance) + parseInt(req.body.amount);

  // const accountsJSON = JSON.stringify(accounts);
  // fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'utf8');
  writeJSON();

  res.render('transfer', { message: 'Transfer Completed' });
});

app.post('/payment', (req, res) => {
  accounts.credit.balance = parseInt(accounts.credit.balance) - parseInt(req.body.amount);
  accounts.credit.available = parseInt(accounts.credit.available) + parseInt(req.body.amount);

  // const accountsJSON = JSON.stringify(accounts);
  // fs.writeFileSync(path.join(__dirname, '/json/accounts.json'), accountsJSON, 'utf8');
  writeJSON();

  res.render('payment', { message: "Payment Successful", account: accounts.credit });
});

app.listen(3000, () => console.log('PS Project running on port 3000.', __dirname));

