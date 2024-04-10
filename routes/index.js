const router = require('express').Router();
const { auth } = require('express-oauth2-jwt-bearer');

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: process.env.AUDIENCE,
    issuerBaseURL: `https://${process.env.ISSUER_BASE_URL}`
});


router.use('/posts', checkJwt, require('./posts'));
router.use('/users', checkJwt, require('./users'));
router.use('/followers', checkJwt, require('./followers'));
router.use('/following', checkJwt, require('./following'));

module.exports = router;