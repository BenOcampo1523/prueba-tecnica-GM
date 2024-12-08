const jwt = require("jsonwebtoken");

function authorization(req, res, next) {
    try {
        console.log(req.cookies['access-token']);
        const token = req.cookies['access-token'];

        if(!token) {
            return res.status(401).send({ message: 'Unauthorized' });
        }

        jwt.verify(token,process.env.JWT_SECRET);
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).send({ message: 'Unauthorized' });
    }
}

module.exports = { authorization };