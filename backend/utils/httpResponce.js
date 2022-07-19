
function sendHttpRespnce(statusCode,succes,message,res)
{
    res.status(statusCode).json({
        succes,
        message
    })
}

module.exports = {sendHttpRespnce}