const mongoose = require('mongoose');




const orderSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    duration:String,
    id:String,
    instantTicketingRequired:Boolean,
    originDestinationId:String,
    paymentCardRequired:Boolean,
    segments:Array,
    source:String,
    type:String,
    email:String

})




const OrderModel = mongoose.model('orders', orderSchema)

module.exports = { OrderModel }