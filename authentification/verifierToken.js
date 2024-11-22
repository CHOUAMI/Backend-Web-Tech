import jwt from 'jsonwebtoken';

const verifierToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Token non fourni." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        req.roleId = decoded.roleId;  // Assure-toi que `roleId` est bien dans le payload du token
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(403).json({ message: "Token expiré." });
        }
        return res.status(403).json({ message: "Token invalide." });
    }
};

export default verifierToken;
