let UserModel = require('mongoose').model('User'),
    encryption = require('../../config/encryption'),
    dbConfig = require('../../config/database'),
    jwt = require('jwt-simple')

function registerNewUser(req, res) {
    let newPersonData = req.body.person;
    if (!newPersonData) {
        return res.json({
            success: false
        })
    }

    UserModel.findOne({ loginEmail: newPersonData.loginEmail }, function (err, user) {
        if (user) {
            res.status(401).send({ err: 'Registration failed. Login email is used by another person' })
        } else {
            newPersonData.salt = encryption.generateSalt();
            newPersonData.hashedPass = encryption.generateHashedPassword(newPersonData.salt, newPersonData.password);

            UserModel.create(newPersonData, function (err, person) {
                if (err) {
                    return res.json({
                        success: false,
                        message: err.message,
                        code: err.code
                    })
                } else {
                    return res.json({
                        success: true,
                        person: person
                    })
                }
            })
        }
    });
}

function tryAuthenticate(req, res) {
    let personToAuthenticate = req.body.person;
    if (!personToAuthenticate) {
        return res.json({
            success: false
        })
    }

    UserModel.findOne({ loginEmail: personToAuthenticate.loginEmail }, function (err, person) {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        }

        if (!person) {
            res.status(401).send({ err: 'Authentication failed. User with this login email not found' })
        } else {
            if (checkIfPasswordMatches(personToAuthenticate.password, person.salt, person.hashedPass)) {
                let token = jwt.encode(person._id, dbConfig.secret);
                const personToReturn = {
                    _id: person._id,
                    firstName: person.firstName,
                    lastName: person.lastName,
                    loginEmail: person.loginEmail
                }
                setTimeout(() => {
                    return res.json({
                        success: true,
                        person: personToReturn,
                        token: token
                    })
                }, 1000);

            } else {
                return res.status(401).send({
                    err: 'Authentication failed. Wrong password',
                    passwordErr: true
                })
            }
        }
    })

}

function updateUser(req, res) {
    let updatedUser = req.body.user;
    if (!updatedUser) {
        return res.json({
            success: false
        })
    }

    UserModel.findByIdAndUpdate(updatedUser._id, updatedUser, function (err, user) {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        } else {
            res.json({
                success: true
            })
        }
    })
}

function getUserById(req, res) {
    let targetUserId = req.params.id;
    if (!targetUserId) {
        return res.json({
            success: false
        })
    }
    UserModel.findById(targetUserId, function (err, user) {
        if (err) {
            res.json({
                success: false,
                msg: err.message
            })
        } else {
            let personToReturn;
            if (user) {
                personToReturn = {
                    _id: person._id,
                    firstName: person.firstName,
                    lastName: person.lastName,
                    loginEmail: person.loginEmail
                }
            }
            res.json({
                success: true,
                user: personToReturn
            })
        }
    })
}

// for server side use
function checkIfPasswordMatches(password, salt, hashedPass) {
    if (encryption.generateHashedPassword(salt, password) === hashedPass) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    registerNewUser,
    updateUser,
    getUserById,
    tryAuthenticate
}