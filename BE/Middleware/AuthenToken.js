import jwt from 'jsonwebtoken';

function authenToken(req, res, next) {
    const token = req.headers.authorization || req.headers.Authorization;
    if (!token?.startsWith('Bearer ')) return res.status(401).send('Access Denied');
    try {
        const verified = jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
}


export default authenToken;