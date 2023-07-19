const mongoose=require('mongoose');

const bookingSchema=new mongoose.Schema({
    place: {type:mongoose.Schema.Types.ObjectId, ref:'place'},
    customer: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
    checkIn:Date,
    checkOut:Date,
    numberOfGuests:Number,
    name:String,
    phone:Number,
    price: Number,
})

const BookingModel=mongoose.model('booking',bookingSchema);

module.exports=BookingModel;