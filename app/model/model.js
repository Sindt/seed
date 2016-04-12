var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var userSchema = new Schema({
    userName: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    created: {type: Date, default: Date.now}
});

userSchema.pre("save", function (next) {
    var user = this;
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err);
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err);
                }
                user.password = hash;
                next();
            });
        });
    } else {
        return next();
    }
});

userSchema.methods = {
    comparePassword: function (passw, callback) {
        bcrypt.compare(passw, this.password, function (err, isMatch) {
            if (err) {
                return callback(err);
            }
            callback(null, isMatch);
        })
    },

    getAll: function (callback) {
        this.model('User').find({}, function (err, res) {
            if (err) {
                return callback(err);
            } else {
                callback(null, res);
            }
        });
    },
    getUserById: function (id, callback) {
        this.model('User').findById(id, function (err, res) {
            if (err) {
                return callback(err);
            } else {
                callback(null, res);
            }
        });
    },

    addUser: function (user, callback) {
        this.model('User').create(user, function (err, res) {
            if (err) {
                console.log(err);
                return callback(err);
            } else {
                callback(null, res);
            }
        });
    }
};

// Build the User model
mongoose.model('User', userSchema);
module.exports = mongoose.model('User');
