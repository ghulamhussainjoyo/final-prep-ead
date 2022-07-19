const mongoose  = require('mongoose');

const productSchema = new mongoose.Schema({

    image:{
        type:String,
        required:[true,"please put product image"]
    },
    name:{
        type:String,
        unique:[true,"this name is already taken"],
        required:[true,"please enter product name"]
    },
    description:{
        type:String,
        required:[true,"please enter product description"],
        trim:true
    },
    price:{
        type:Number,
        required:[true,"please enter product price"],
        default:0.0
    },

    rating:{
        type:Number,
        default:0
    },
    category:{
        type:String,
        required:[true,'Please select category for this product'],
        message:'Please Select correct category for product'

    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    stock:{
        type:Number,
        required:[true,'Please enter product stock'],
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})


const productModel = mongoose.model("products",productSchema);
module.exports = productModel