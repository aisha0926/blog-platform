import jwt from 'jsonwebtoken';

export const verifyUser = async (req, res, next) => {
  const authorization = req.headers.authorization;

  try {
    if (!authorization)
      return res.status(401).send({ message: 'Unathorized access' });

    const token = authorization.split(' ')[1];

    if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      req.user = decodedToken;
      next();
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error', error: error.message });
  }
};
