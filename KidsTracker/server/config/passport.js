const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    FullyAuthorisedPerson = require('mongoose').model('User')

module.exports = function (passport, dbConfig) {
    let options = {};
    options.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
    options.secretOrKey = dbConfig.secret;
    passport.use(new JwtStrategy(options, function (jwt_payload, done) {
        FullyAuthorisedPerson.findOne({ _id: jwt_payload }, function (err, person) {
            if (err) {
                done(err, false);
            }
            if (person) {
                done(null, person);
            } else {
                done(null, false);
            }
        })
    }))
}