module.exports = function (mongoose) {
    let userModel = require('./user')

    userModel.init(mongoose)
}