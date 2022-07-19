const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/config');

//
const userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: [ true, 'please enter email' ]
	},
	name: {
		type: String,
		required: [ true, 'please enter name' ]
	},
	phone: {
		type: String,
		required: [ true, 'please enter phone number' ]
	},
	country: {
		type: String,
		required: [ true, 'please enter country' ]
	},
	image: {
		type: String,
		required: [ true, 'please put your image' ]
	},
	role: {
		type: String,
		default: 'user'
	},
	password: {
		type: String,
		type: String,
		required: [ true, 'please enter password' ],
		select: false
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date
});

userSchema.pre('save', function(next) {
	const user = this;
	bcrypt.hash(this.password, 10, (err, hash) => {
		if (err) next(err);
		this.password = hash;
		next();
	});
});

userSchema.methods.comaprePassword = async function(enteredPassword) {
    console.log(this.password)
	return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getJwtToken = async function() {
	return jwt.sign({ id: this._id }, JWT_SECRET, {
		expiresIn: 86400
	});
};
const userModel = mongoose.model('user', userSchema);
module.exports = userModel;
