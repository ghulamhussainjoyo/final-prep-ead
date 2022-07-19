function sendJwt(statusCode,user,token,res)
{
    res
			.status(statusCode)
			.cookie('token', token, {
				Expires: 86000,
				httpOnly: true
			})
			.json({
				succes: true,
				user,
				token
			});
}
module.exports = sendJwt