import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const createToken = (user) => {
  return jwt.sign(user, process.env.SECRET_KEY);
};

export const verifyUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const findUser = await User.findOne({ username: username });

    if (!findUser)
      return res.status(400).send({ message: `Cannot find user ${username}` });

    const checkPasword = bcrypt.compareSync(password, findUser.password);

    if (checkPasword) {
      //   if password if valid then create a token
      //   assign the token to req.user
      //   call next after

      const token = createToken({
        userId: findUser._id,
        isAdmin: findUser.isAdmin,
      });

      req.send({ message: 'Login successful', token: token });

      next();
    }
  } catch (error) {}
};
