import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/carts', { withCredentials: true });
        setCart(res.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching cart data');
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // Handle updating cart items
  const handleUpdateCart = async (itemId, newQuantity) => {
    try {
      const updatedItem = {
        foodId: itemId,
        quantity: newQuantity,
      };

      const res = await axios.put('http://localhost:3000/api/cart', updatedItem, { withCredentials: true });
      setCart(res.data); // Assuming the response includes the updated cart
    } catch (err) {
      setError('Error updating cart item');
    }
  };

  // Handle removing an item from the cart
  const handleRemoveItem = async (itemId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/${itemId}`, { withCredentials: true });
      setCart((prevCart) => ({
        ...prevCart,
        items: prevCart.items.filter((item) => item.foodId !== itemId),
      }));
    } catch (err) {
      setError('Error removing cart item');
    }
  };

  // Handle checkout (example, you can customize the logic)
  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cart && cart.items.length > 0 ? (
        <div>
          {cart.items.map((item) => (
            <div key={item.foodId} className="cart-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <div>
                <label>Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleUpdateCart(item.foodId, e.target.value)}
                />
              </div>
              <button onClick={() => handleRemoveItem(item.foodId)}>Remove</button>
            </div>
          ))}
          <div className="total">
            <h3>Total: ${cart.total}</h3>
          </div>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
