import User from '../models/users.js';
import Role from '../models/roles.js';

const autoriser = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Accès interdit' });
    }
    next();
  };
};

export default autoriser;
