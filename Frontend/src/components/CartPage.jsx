import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  // GET Cart Items
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/carts", {
          withCredentials: true,
        });
        setCartItems(response.data.data?.items || []);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCartItems();
  }, []);

  // DELETE Cart Item
  const handleRemoveItem = async (cartId) => {
    try {
      await axios.delete(`http://localhost:3000/api/carts/${cartId}`, {
        withCredentials: true,
      });
      setCartItems(cartItems.filter((item) => item._id !== cartId));
      alert("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item from cart:", error);
      alert("Failed to remove item. Please try again.");
    }
  };

 
  const handleUpdateQuantity = async (itemId, newQuantity, foodId) => {
    try {
      if (newQuantity < 1) return; 

      await axios.put(
        "http://localhost:3000/api/carts",
        { foodId, quantity: newQuantity },
        { withCredentials: true }
      );

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    } catch (error) {
      console.error("Error updating cart item:", error);
      alert("Failed to update item. Please try again.");
    }
  };

  // PLACE ORDER
  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/orders",
        {},
        {
          withCredentials: true,
        }
      );

      setCartItems([]); // Clear cart after order
      alert("Order placed successfully!");
      console.log("Order Response:", response.data);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + (item.price || 0) * (item.quantity || 0),
      0
    );
  };

  return (
    <div className="max-w-4xl mx-auto mt-24 px-4 py-10 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>

      {cartItems?.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center p-4 border-b"
              >
                <div>
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Price: Rs. {item.price}</p>

                  <div className="text-gray-600 flex items-center gap-2 mt-1">
                    Quantity:
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item._id,
                          item.quantity - 1,
                          item.foodId
                        )
                      }
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(
                          item._id,
                          item.quantity + 1,
                          item.foodId
                        )
                      }
                      className="px-2 py-1 bg-gray-300 rounded hover:bg-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={() => handleRemoveItem(item._id)}
                  className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-6">
            <h2 className="text-xl font-bold">Total: Rs. {calculateTotal()}</h2>
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition duration-200"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
