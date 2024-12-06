import React, { useState,  createContext } from "react";


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [menuItems] = useState([
    {
      id: 1,
      name: "Margherita Pizza",
      price: 8.99,
      category: "Pizza",
      nutritionalInfo: {
        calories: 300,
        fat: 10,
        protein: 15,
      },
      customizationOptions: ["Extra Cheese", "Olives", "Mushrooms"],
    },
    {
      id: 2,
      name: "Caesar Soup",
      price: 6.49,
      category: "Salad",
      nutritionalInfo: {
        calories: 150,
        fat: 5,
        protein: 10,
      },
      customizationOptions: ["Croutons", "Grilled Chicken", "Parmesan"],
    },
  ]);

  const [cart, setCart] = useState([]);

  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   const fetchMenuItems = async () => {
  //     try {
  //       const response = await fetch("https://api.example.com/menu-items");
  //       const data = await response.json();
  //       setMenuItems((prev) => [...prev, ...data]);
  //     } catch (error) {
  //       console.error("Error fetching menu items:", error);
  //     }
  //   };

  //   fetchMenuItems();
  // }, []);

  const addToCart = (item, newOptions) => {
    console.log(item);
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1, selectedOptions: newOptions }];
      }
    });
  };

  const updateCartItem = (id, quantity) => {
    setCart((prevCart) =>
      prevCart
        .map((item) => (item.id === id ? { ...item, quantity } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ menuItems, cart, addToCart, updateCartItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
