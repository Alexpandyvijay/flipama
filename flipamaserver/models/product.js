const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productDetails = new Schema({
    product_type : String,
    product_name : String,
    product_price : Number,
    available_quantity : Number
});
module.exports = mongoose.model('productdetails',productDetails);