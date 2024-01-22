const Product = require('./product-model');

// API to add products to the database
module.exports.createProduct = async (req, res) => {
  try {
    // Extracting relevant fields from req.body
    const { id, name, quantity } = req.body;

    // Checking if required fields are present
    if (!id || !name || !quantity) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        data: {},
      });
    }

    // Creating the product
    const createdProduct = await Product.create({ id, name, quantity });

    // Responding with success message and created data
    return res.status(201).send({
      message: "Record created successfully",
      data: createdProduct,
    });
  } catch (err) {
    // Handling errors and responding with an error message
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong while creating the record",
      data: {},
    });
  }
};

// API to list products
exports.listProducts = async (req, res) => {
  try {
    console.log('test console')
    const products = await Product.find({}, { _id: 1, name: 1, quantity: 1 });
    
    res.status(201).send({ data: { products } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// API to delete products
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    await Product.findByIdAndRemove(productId);

    res.status(201).send({ data: { message: 'Product deleted' } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// API to update quantity of a product (can be incremented or decremented)
exports.updateQuantity = async (req, res) => {
  try {
    const productId = req.params.id;
    const { number } = req.query;

    let product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    product.quantity += parseInt(number, 10);
    await product.save();

    res.status(201).send({ data: { product, message: 'Updated successfully' } });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
