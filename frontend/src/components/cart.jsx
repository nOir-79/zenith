import { useData } from "./Datacontext.jsx";

const Cart = () => {
  const {
    isLoggedIn,
    setIsLoggedIn,
    cartProducts,
    setCartProducts,
    customerData,
  } = useData();

  const handleRemove = () => {
    setCartProducts([]);
    console.log("Removed from cart");
  };
  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3000/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer_phone: customerData[0].phone_number,
          products: cartProducts,
        }),
      });
      if (response.status == 200) {
        console.log("checkout successful");
        setCartProducts([]);
      } else {
        console.error("Checkout failed");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (isLoggedIn == false) {
    return (
      <div>
        <h1>Please login to view your cart</h1>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Your cart</h1>
        <div>
          {cartProducts.map((product) => (
            <div key={product.id}>
              <h3>{product.product_name}</h3>
              <h4>{product.price}</h4>
              <button onClick={handleRemove}>Remove from cart</button>
            </div>
          ))}
        </div>
        <div>
          <button onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    );
  }
};

export default Cart;
