const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderDetails = new Schema({
    userId : { 
        type : String,
        required : true,
        unique : true
    },
    order : [{
        date : Date,
        product_list : [
            {
                product_type : String,
                product_name : String,
                quantity : Number
            }
        ],
        total : Number
    }]
})
module.exports = mongoose.model('orderdetails',orderDetails);