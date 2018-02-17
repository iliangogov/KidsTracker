let UserModel = require('mongoose').model('User')

function registerNewUser(req, res) {
    res.send({
        success: true
    })
}

function updateUser(req, res) {
    res.send({
        success: true
    })
}

function getUserById(req, res) {
    res.send({
        success: true
    })
}

module.exports = {
    registerNewUser,
    updateUser,
    getUserById
}