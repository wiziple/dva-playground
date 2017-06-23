const user = require('../controllers/user');
const passport = require('passport');

require('../services/passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

export default function (app) {
  app.get('/', (req, res) => {
    res.send({ message: 'this is non-secret.' });
  });
  app.get('/secret', requireAuth, (req, res) => {
    res.send({ message: 'this is super secret information' });
  });
  app.post('/signup', user.signup);
  app.post('/signin', requireSignin, user.signin);
}
