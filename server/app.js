const express = require('express');
const path = require('path');
const { User } = require('./db/db');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '..','public')))
app.get('/', (req, res) => res.sendFile(path.join(__dirname, '..', 'public', 'index.html')));

app.post('/api/auth', async (req, res, next) => {
  try {
    /**
     * req.body
     * {
     *  username: ourUsername
     *  password: ourPassword
     * }
     */
    console.log(req.body);
    res.send({ token: await User.authenticate(req.body) });
  } catch (ex) {
    next(ex);
  }
});

app.get('/api/auth', async (req, res, next) => {
  try {
    // Our tokens will be sent with the req.header of "authorization"
    res.send(await User.byToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});

app.listen(3000, () => {
  console.log(`Running on port 3000`)
})
