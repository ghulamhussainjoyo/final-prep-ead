const path = require('path');
const fs = require('fs');
const Product = require('../models/product');
const { errorHandler } = require('../utils/errorHandler');
const { sendHttpRespnce } = require('../utils/httpResponce');

//
exports.createProduct = (req, res) => 
{

	const img = req.files?.img || undefined
	if (img !== undefined) {
		const imgName = `${Date.now()}_${img.name}`;
		img.mv(path.resolve(__dirname, '../images', imgName), (err) => {
			if (err) {
				return sendHttpRespnce(500, false, err.message, res);
			}

			Product.create({ ...req.body, image: imgName, user: req.user._id })
				.then((result) => {
					sendHttpRespnce(200, true, 'product added successfully', res);
				})
				.catch((err) => errorHandler(err, res));
		});
	}
    else
    {
        return sendHttpRespnce(500, false, "Please upload image", res);
    }
};

exports.products = (req, res, next) => {
	Product.find()
		.then((result) => {
			res.status(200).json({
				success: true,
				products: result
			});
		})
		.catch((err) => console.log(err));
};

exports.deleteProduct = (req, res, next) => {
	const { id } = req.params;
	Product.findByIdAndDelete(id)
		.then((result) => {
			if (result) {
				try {
					const _path = path.resolve(__dirname, `../images/`, result.image);
					fs.unlink(_path, (err) => {
						if (err) {
							console.log('err', err);
						}
						return;
					});
					sendHttpRespnce(200, true, 'Product deleted successfuly', res);
				} catch (err) {
					errorHandler(err, res);
				}
			} else sendHttpRespnce(400, false, 'Product not exists', res);
		})
		.catch((err) => errorHandler(err, res));
};


exports.updateProduct = async (req,res)=>
{
    const {id} = req.params;
    const img  = req.files?.img || undefined

	if (img !== undefined) {

         Product.findById(id).then(data => {
            console.log(data)

                const _path = path.resolve(__dirname, `../images/`, data.image);
					fs.unlink(_path, (err) => 
                    {
						if (err)  return errorHandler(err,res);
                        // 🛡️ ➡️
                        const imgName = `${Date.now()}_${img.name}`;
                        img.mv(path.resolve(__dirname, '../images', imgName), (err) => {
                            if (err) {
                                return sendHttpRespnce(500, false, err.message, res);
                            }
                
                            Product.findByIdAndUpdate(id,{ ...req.body, image: imgName, user: req.user._id })
                                .then((result) => {
                                    sendHttpRespnce(200, true, 'product updated successfully', res);
                                })
                                .catch((err) => errorHandler(err, res));
                        });
						
					});

        }).catch(err=> errorHandler(err,res))
	}
    else
    {
        return sendHttpRespnce(500, false, "image is missing", res);
    }

}
