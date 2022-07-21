const mongoose = require('mongoose');




const hotelSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    address:String,
    rating:Number,
    hotel_name:String,
    max_photo_url:String,
    email:String

})




const HotelModel = mongoose.model('hotelOrders', hotelSchema)

module.exports = { HotelModel }