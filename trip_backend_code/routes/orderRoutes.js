const orderRouter = require('express').Router();

const { HotelModel } = require('../models/hotel');
const { OrderModel } = require('../models/order');

orderRouter.post('/order_now', async (req, res) => {
  let order = new OrderModel({ ...req.body });

  order
    .save()
    .then((ord) => {
      console.log(ord, 'ORDER PLACED');
      res.send(ord);
    })
    .catch((e) => {
      console.log(e, 'ERROR');
      console.log('Error While placing err');
    });
});

orderRouter.post('/order_hotel', async (req, res) => {
  let hotelOrder = new HotelModel({ ...req.body });

  hotelOrder
    .save()
    .then((ord) => {
      console.log(ord, 'Hotel Booking PLACED');
      res.send(ord);
    })
    .catch((e) => {
      console.log(e, 'ERROR');
      console.log('Error While placing err');
    });
});

module.exports = orderRouter;
