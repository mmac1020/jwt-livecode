const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const jwt = require('jsonwebtoken');

const tokenSecret = 'OUR_SECRET_PHRASE';

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/jwt_example',
  { logging: false }
);

const User = db.define('user', {
  username: STRING,
  password: STRING,
});

User.byToken = async (token) => {
  try {
    // Typically we'll need to decode the token to get the information, but our first example is just a user's ID.
    // const user = await User.findByPk(JSON.parse(token).id);
    const verifiedToken = jwt.verify(token, tokenSecret);
    console.log('verified token', verifiedToken);
    const user = await User.findByPk(verifiedToken.id);
    if (user) {
      return user;
    }
    // If the user is not found in the database we need to throw an error
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  } catch (ex) {
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  }
};

User.authenticate = async ({ username, password }) => {
  const user = await User.findOne({
    where: {
      username,
      password,
    },
  });
  if (user) {
    // This is where our JWT SIGN should go
    // return { id: user.id };
    const token = jwt.sign(
      { id: user.id, username: user.username },
      tokenSecret
    );
    console.log('token', token);
    return token;
  }
  const error = Error('bad credentials');
  error.status = 401;
  throw error;
};


module.exports = {
  db,
  User,
};
