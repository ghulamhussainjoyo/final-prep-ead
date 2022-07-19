const User = require('../models/user');
const path = require('path');
const { sendHttpRespnce } = require('../utils/httpResponce');
const sendJwtToken = require('../utils/sendJwt');
const { errorHandler } = require('../utils/errorHandler');

exports.register = async (req, res) => {
	try {
		const img = req.files.img;
		const imgName = `${Date.now()}_${img.name}`;
		img.mv(path.resolve(__dirname, '../images', imgName), async function(err) {
			if (err) {
				return sendHttpRespnce(500,false,err.message,res)
			}

			User.create({ ...req.body, image: imgName })
				.then((result) => {
					console.log(result);
					res.status(200).json({
						success: true
					});
				})
				.catch((err) => {
					errorHandler(err, res);
				});
		});
	} catch (err) {
		res.status(400).json({
			success: false,
			err: err.message
		});
	}
};

exports.login = async (req, res) => {
	try {
		const { email, password } = req.body;
		console.log(req.body);
		if (!email || !password) {
			return sendHttpRespnce(401, false, 'Please enter email or password', res);
		}
		const user = await User.findOne({ email }).select('+password');

		if (!user) {
			return sendHttpRespnce(401, fasle, 'Please enter correct email or password', res);
		}

		const isMatch = await user.comaprePassword(password);
		console.log({ isMatch });
		if (!isMatch) {
			return sendHttpRespnce(401, false, 'Please enter correct email or password', res);
		}

		const token = await user.getJwtToken();
		sendJwtToken(200, user, token, res);
	} catch (err) {
		// sendHttpRespnce(400,false,err,res)

		console.log(err);
		res.status(400).json({
			success: false,
			error: err.message
		});
	}
};
