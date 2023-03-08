// const Order = require('../models/order.model')
// const OrderItem = require('../models/order-item.model')
const express = require('express')
const orderRouter = express.Router()
const orderController = require('../controllers/order.controller')

const passport = require('passport');
// const app = require('../app');
require("../config/verifyBearerToken")
orderRouter.use(passport.initialize());
// orderRouter.get(`/`, async (req, res) =>{
//     const orderList = await Order.find().populate('user', 'name').sort({'dateOrdered': -1});

//     if(!orderList) {
//         res.status(500).json({success: false})
//     }
//     res.send(orderList);
// })

// orderRouter.get(`/:id`, async (req, res) =>{
//     const order = await Order.findById(req.params.id)
//     .populate('user', 'name')
//     .populate({
//         path: 'orderItems', populate: {
//             path : 'product', populate: 'category'}
//         });

//     if(!order) {
//         res.status(500).json({success: false})
//     }
//     res.send(order);
// })

orderRouter.get(`/`, passport.authenticate('jwt', {session: false}), orderController.getOrderList)

orderRouter.get(`/:id`, passport.authenticate('jwt', {session: false}), orderController.getOrderById)

orderRouter.post('/', passport.authenticate('jwt', {session: false}), orderController.postOrder)

orderRouter.put('/:id', passport.authenticate('jwt', {session: false}), orderController.updateOrder)

orderRouter.delete('/:id', passport.authenticate('jwt', {session: false}), orderController.deleteOrder)

orderRouter.get('/get/totalsales', passport.authenticate('jwt', {session: false}), orderController.getTotalSales)

orderRouter.get(`/get/userorders/:userid`, passport.authenticate('jwt', {session: false}), orderController.getUserOrderList)
// orderRouter.get(`/get/count`, async (req, res) =>{
//     const orderCount = await Order.countDocuments((count) => count)

//     if(!orderCount) {
//         res.status(500).json({success: false})
//     }
//     res.send({
//         orderCount: orderCount
//     });
// })


module.exports = orderRouter
