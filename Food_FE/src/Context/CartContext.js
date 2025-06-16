import React, { useState, createContext, useContext, useEffect } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const initialCart = JSON.parse(localStorage.getItem("cart")) || [];
  const [cart, setCart] = useState(initialCart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const { idsp, hinhanh, tensp, giaban, soluong } = product;

    const existingProduct = cart.find((item) => item.idsp === idsp);

    if (existingProduct) {
      if (existingProduct.quantity >= soluong) {
        alert("Bạn không thể mua quá số lượng của cửa hàng");
        return;
      }
      const updatedCart = cart.map((item) =>
        item.idsp === idsp ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { idsp, hinhanh, tensp, giaban, quantity: 1 }]);
    }
  };

  const addDetailToCart = (product, quantity) => {
    const { idsp, hinhanh, tensp, giaban, soluong } = product;

    if (quantity <= 0) return;

    const existingProduct = cart.find((item) => item.idsp === idsp);

    if (existingProduct) {
      if (existingProduct.quantity + quantity > soluong) {
        alert("Bạn không thể mua quá số lượng của cửa hàng");
        return;
      }

      const updatedCart = cart.map((item) =>
        item.idsp === idsp
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { idsp, hinhanh, tensp, giaban, quantity }]);
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    const product = cart.find((item) => item.idsp === productId);
    if (!product) return;

    if (newQuantity > product.soluong) {
      alert("Bạn không thể mua quá số lượng của cửa hàng");
      return;
    }
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const updatedCart = cart.map((item) =>
      item.idsp === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.idsp !== productId);
    setCart(updatedCart);
  };

  const clearCart = () => {
    setCart([]);
  };

  const confirmCart = () => {
    // Có thể thực hiện các hành động cần thiết khi xác nhận giỏ hàng, ví dụ: gửi đơn hàng đến backend
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addDetailToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        confirmCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
