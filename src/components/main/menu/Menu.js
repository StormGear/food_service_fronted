import React from "react";
import MenuItem from "./MenuItem";
import { useContext } from "react";
import { CartContext } from "../../../contextproviders/CartContext";

const Menu = () => {
  const { menuItems, addToCart } = useContext(CartContext);
  return (
    <div className="p-4">
      {menuItems.map((item) => (
        <MenuItem key={item.id} item={item} onAddToCart={addToCart} />
      ))}
    </div>
  );
};

export default Menu;
