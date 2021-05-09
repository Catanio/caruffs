const jwt = require('jsonwebtoken')

const isAuthorized  = function(req, res, next) {
  jwt.verify(req.header('Authorization').replace('Bearer ', ''), process.env.SECRET, function(err, decoded) {
    if (err) return res.status(401).json({ auth: false, message: 'Unauthorized' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.user = decoded;
    next();
  });
}

module.exports = {
  isAuthorized
}