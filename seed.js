const { db, User } = require('./server/db/db');

const users = [
  { username: 'Mac', password: 'iAmTheBest' },
  { username: 'Ben', password: 'KINDA_LAME' },
  { username: 'Lauren', password: 'superFellow!@#' },
];

const seed = async () => {
  await db.sync({force: true});

  await Promise.all(
    users.map(async (user) => {
      await User.create(user)
    })
  )

  db.close();
  console.log('Seeding successful!');
}

seed().catch((err) => {
  db.close();
  console.log(`

    Error seeding:

    ${err.message}

    ${err.stack}

  `);
});
