const { sendHttpRespnce } = require('../utils/httpResponce');

function authorizeRoles(...role) {
	return (req, res, next) => {
		if (!role.includes(req.user.role)) {
			return sendHttpRespnce(403, false, `Role (${req.user.role}) is not allowed to access this resourse`, res);
		}

		next();
	};
}

module.exports = authorizeRoles
