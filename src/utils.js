const {Sequelize} = require('sequelize');
const {sqlite} = require('sqlite3'); // Needed to fix sequelize issues with WebPack

module.exports.paginateResults = ({
  after: cursor,
  pageSize = 20,
  results,
  // can pass in a function to calculate an item's cursor
  getCursor = () => null,
}) => {
  if (pageSize < 1) return [];

  if (!cursor) return results.slice(0, pageSize);
  const cursorIndex = results.findIndex(item => {
    // if an item has a `cursor` on it, use that, otherwise try to generate one
    let itemCursor = item.cursor ? item.cursor : getCursor(item);

    // if there's still not a cursor, return false by default
    return itemCursor ? cursor === itemCursor : false;
  });

  return cursorIndex >= 0
    ? cursorIndex === results.length - 1 // don't let us overflow
      ? []
      : results.slice(
          cursorIndex + 1,
          Math.min(results.length, cursorIndex + 1 + pageSize),
        )
    : results.slice(0, pageSize);
};

module.exports.createStore = () => {

  const db = (() => {
    if (process.env.HEROKU_POSTGRESQL_ONYX_URL) {
      // the application is executed on Heroku ... use the postgres database
      // Parse Heroku connections data for port and host
      var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/)

      console.log(`🚀 app port: ${match[4]}`);
      console.log(`🚀 app host: ${match[3]}`);

      return new Sequelize(process.env.HEROKU_POSTGRESQL_ONYX_URL, {
        dialect:  'postgres',
        protocol: 'postgres',
        port:     match[4],
        host:     match[3]
      })
    } else {
      // the application is executed on the local machine ... use sqlite
      return new Sequelize({
        dialect: 'sqlite',
        dialectModule: sqlite, // Needed to fix sequelize issues with WebPack
        storage: './store.sqlite'
      });
    }
  })();


  const users = db.define('user', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    email: Sequelize.STRING,
    profileImage: Sequelize.STRING,
    token: Sequelize.STRING,
  });

  const trips = db.define('trip', {
    createdAt: Sequelize.DATE,
    updatedAt: Sequelize.DATE,
    launchId: Sequelize.INTEGER,
    userId: Sequelize.INTEGER,
  });

  return { db, users, trips };
};
