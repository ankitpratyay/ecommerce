const Products = require("../models/productModel");

const GET_PRODUCTS = async (req, res) => {
  Products.find({}).then((prod) => {
    const { _id, description, __v, ...others } = prod;
    console.log(prod);
    console.log(others);
    res.json(others);
  });
};
const GET_ONE_PROD = async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};
const CREATE_PRODUCT = async (req, res) => {
  const newProduct = new Products(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
const UPDATE_PRODUCT = async (req, res) => {
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).send(updatedProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
const DELETE_PRODUCT = async (req, res) => {
  try {
    await Products.findByIdAndDelete(req.params.id);
    res.status(200).json("Product Has been Deleted !!!");
  } catch (error) {
    res.status(500).json(error);
  }
};
module.exports = {
  CREATE_PRODUCT,
  GET_PRODUCTS,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_ONE_PROD,
};
