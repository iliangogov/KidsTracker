module.exports.init = function (mongoose) {
    let Schema = mongoose.Schema;
    let userSchema = new Schema({
        firstName: String,
        lastName: String,
        title: String,
        gender: String,
        dateOfBirth: Date,
        placeOfBirth: String,
        country: String,
        loginEmail: String,
        salt: String,
        hashedPass: String,
        isAdmin: { type: Boolean, default: false },
        mobileNumber: { type: String, default: 'Not provided' },
        resetPasswordToken: String,
        resetPasswordExpires: Date
    })

    let User = mongoose.model("User", userSchema)
}