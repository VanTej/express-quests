const authRouter = require('./auth');
const moviesRouter = require('./movies');
const usersRouter = require('./users');

const setupRoutes = (app) => {
  app.use('/api/movies', moviesRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/auth', authRouter);
};

module.exports = {
  setupRoutes,
};