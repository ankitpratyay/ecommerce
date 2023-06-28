const Order = require("../models/OrderModel");

const CREATE_ORDER = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newCart.save();
    res.status(200).json(savedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

const UPDATE_ORDER = async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};
const DELETE_ORDER = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order Has been Deleted  !!!");
  } catch (error) {
    res.status(500).json(error);
  }
};

const GET_ONE_ORDER = async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};
const GET_ORDERS = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  CREATE_ORDER,
  UPDATE_ORDER,
  DELETE_ORDER,
  GET_ORDERS,
  GET_ONE_ORDER,
};
