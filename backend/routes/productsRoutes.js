import { Router } from 'express';
const router = Router();
import Product  from '../models/productSchema.js';

// GET /API/products: Retrieve all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();  // Use Product model to call find()
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error in getting products', error });
  }
});

// POST /API/products: Create a new product
router.post('/products', async (req, res) => {
  const { name, description, price } = req.body;

  if (!name || !description || !price) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const newProduct = new Product({ name, description, price });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error in creating product', error });
  }
});

export default router;
