module.exports = function (req, res, next) {
    var token = req.headers['authorization'];
    if (token) {
        next();
    } else {
        res.status(401).json({code:401,message:'You must provide application token'});
    }
};
