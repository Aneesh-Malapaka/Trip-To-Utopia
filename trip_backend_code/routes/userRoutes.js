const { User } = require('../models/users');

const userRouter = require('express').Router();
const bcrypt = require('bcrypt');

userRouter.post('/login', async (req, res) => {
  console.log('LOGIN REQUEST RECEIVED');
  console.log(req.body);

  try {
    let { email, password } = req.body;
    let userFind = await User.findOne({ email });

    if (!userFind) {
      return res.status(409).send({ error: 'User Not Found' });
    }

    console.log(userFind, 'USERFOUND');

    let userAuthenticated = await bcrypt.compare(password, userFind.password);
    console.log(userAuthenticated, 'PASSWORD');

    return res
      .status(200)
      .send({
        id: userFind._id,
        isAdmin: userFind.isAdmin,
        email: userFind.email,
        userAuthorized: userFind.userAuthorized,
      });
  } catch (e) {
    console.log(e, 'ERROR WHILE LOGGING IN');
  }
});

userRouter.post('/signup', async (req, res) => {
  try {
    let { email, password, username } = req.body;
    console.log(email, 'EMAIL');
    console.log(password, 'password');
    console.log(username, 'username');

    let userEmailFind = await User.findOne({ email });
    let userUsernameFind = await User.findOne({ username });

    if (userEmailFind) {
      return res
        .status(409)
        .send({ error: 'User Already Exists with that email' });
    }

    if (userUsernameFind) {
      return res
        .status(409)
        .send({ error: 'User Already Exists with that username' });
    }

    let hash = await bcrypt.hash(password, 8);
    let user = new User({
      username,
      email,
      password: hash,
      isAdmin: false,
      userAuthorized: true,
    });
    user
      .save()
      .then((myUser) => {
        console.log('user successful', myUser);
      })
      .catch((e) => console.log('ERROR WHILE SIGNING UP', e));
    res.status(201).send('SIGNUP RECEIVED');
  } catch (e) {
    console.log(e, 'ERROR WHILE SIGNING UP A USER');
  }
});

module.exports = { userRouter };
