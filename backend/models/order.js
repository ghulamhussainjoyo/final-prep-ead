const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
	paymentInfo: {
		phone: {
			type: String,
			required: true
		},
		address: {
			type: String,
			requied: true
		},
		city: {
			type: String,
			required: true
		},
		country: {
			type: String,
			required: true
		}
	},
    orderItem:{
        name:{
            type:String,
            required:true
        },
        image:{
            type:String,
            requied:true
        },
        price:{
            type:Number,
            
        },
        quantity:{
            type:Number
        },
        product:{
            type:mongoose.Types.ObjectId,
            ref:'products'
        }
    }
});


const orderModel = mongoose.model("order",orderSchema)
module.exports = orderModel