import jwt from 'jsonwebtoken'
import { secretkey } from '../tools/secretkey';
export const authenticate = (req, res, next) => {
    console.log(req.headers['authorization'])
    // Check if the user is authenticated
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    // Verify the token (e.g. using a library like jsonwebtoken)
    jwt.verify(token, secretkey, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};
