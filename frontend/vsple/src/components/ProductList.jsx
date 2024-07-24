import  { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import './ProductList.css';  // Ensure you create and style this file

Modal.setAppElement('#root');

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = async () => {
    try {
      await axios.post('http://localhost:4000/api/products', newProduct);
      fetchProducts();
      setModalIsOpen(false);
      setNewProduct({ name: '', description: '', price: '' });
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="product-list">
      <h1>Product Listing</h1>
      <button className="add-product-button" onClick={() => setModalIsOpen(true)}>+ Add Product</button>
      <table>
        <thead>
          <tr>
            <th>S. No.</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id}>
              <td>{index + 1}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>₹{product.price}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} className="modal" overlayClassName="overlay">
        <h2>Add Product</h2>
        <form onSubmit={(e) => { e.preventDefault(); handleAddProduct(); }}>
          <div className="form-group">
            <label>Product Name</label>
            <input type="text" name="name" value={newProduct.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Product Description</label>
            <input type="text" name="description" value={newProduct.description} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Product Price</label>
            <input type="number" name="price" value={newProduct.price} onChange={handleInputChange} required />
          </div>
          <button type="submit" className="submit-button">Continue</button>
          <button type="button" className="cancel-button" onClick={() => setModalIsOpen(false)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
};

export default ProductList;
