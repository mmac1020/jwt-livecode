const Sequelize = require('sequelize');
const { STRING } = Sequelize;
const jwt = require('jsonwebtoken');

const tokenSecret = process.env.JWTSECRET;

const db = new Sequelize(
  process.env.DATABASE_URL || 'postgres://localhost/jwt_example',
  {logging: false}
);

const User = db.define('user', {
  username: STRING,
  password: STRING,
});

User.byToken = async (token) => {
  try {
    // Typically we'll need to decode the token to get the information, but our first example is just a user's ID.
    const user = await User.findByPk(token);
    if (user) {
      return user;
    }
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
    // for now this is just our user's IDs. Later on this will be a JWT
    return jwt.sign({id: user.id, username: user.username}, process.env.JWTSECRET);
  }
  const error = Error('bad credentials');
  error.status = 401;
  throw error;
};


module.exports = {
  db,
  User,
};
