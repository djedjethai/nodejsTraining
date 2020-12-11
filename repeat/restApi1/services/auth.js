const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    // we verif if headers is setted up with Authorization
    console.log('ds putain de authentication')
    console.log(req.get('Authorization'));
    const authHeaders = req.get('Authorization');
    // si pas de auth, pas la peine d'aller plus loin
    if (!authHeaders) {
        const error = new Error('Not authenticated');
        error.statusCode = 401;
        throw error;
    }   
    const token = req.get('Authorization').split(' ')[1];
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "thisIsTheSecret");
    } catch {
        next(new Error('technical pb, please try again'))
	return;
    }   
    if (!decodedToken) {
        next(new Error('you are not authenticated'))
	return;
    }   
    req.userId = decodedToken._id;
    console.log('req.userId from is-auth middleware');
    console.log(req.userId);
    next();
}


