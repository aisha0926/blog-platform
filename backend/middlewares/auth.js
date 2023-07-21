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
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(403).json({ success: false, message: 'Invalid token.' });
    }
  };