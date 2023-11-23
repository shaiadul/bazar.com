"use client";

import { useCart } from "@/app/context/cart";
import Link from "next/link";
import React, { useState } from "react";

const Card = ({ product }) => {
  const { title, price, image } = product;
  const [isFavorite, setIsFavorite] = useState(false);
  const { cartItems, setCartItems } = useCart();

  const addToCart = () => {
    const productIndex = cartItems.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      setCartItems((prevCartItems) => {
        const updatedCartItems = [...prevCartItems];
        updatedCartItems[productIndex].quantity += 1;
        return updatedCartItems;
      });
    } else {
      setCartItems((prevCartItems) => [
        ...prevCartItems,
        { ...product, quantity: 1 },
      ]);
    }

    setTimeout(() => {
      const updatedCartItems = [...cartItems];
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    }, 0);
  };

  return (
    <div className="w-full bg-white drop-shadow-md rounded-lg overflow-hidden border border-solid border-gray-200 ">
      <img
        className="object-cover h-40 rounded-tl-lg rounded-tr-lg w-fill h-48 mx-auto my-5 hover:scale-110 duration-500"
        src={image}
      />
      <div className="px-5 py-3 space-y-2">
        <h3 className="text-md text-black my-5">
          {title && title.slice(0, 35)}
        </h3>
        <div className="space-x-2">
          <span className="px-3 py-0.5 border border-blue-500 text-[11px] text-blue-500">
            Free Ship
          </span>
          <span className="px-3 py-0.5 border border-blue-500 text-[11px] text-blue-500">
            7 Day Return
          </span>
        </div>
        <div className="space-x-2">
          <span className="text-2xl font-semibold text-teal-700">${price}</span>
          <span className="text-sm line-through text-gray-500">$0000</span>
          <span className="text-sm text-red-700">00% off</span>
        </div>
        <div className="flex justify-between items-center pt-3 pb-2">
          <button
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-center text-sm text-white rounded duration-300"
            onClick={addToCart}
          >
            Add to Cart
          </button>

          <a
            href=""
            title="Add to Favorites"
            className={`${
              isFavorite ? "text-red-600" : "text-gray-500"
            } text-3xl cursor-pointer hover:text-red-600 duration-300`}
            onClick={() => setIsFavorite(!isFavorite)}
          >
            &hearts;
          </a>
        </div>
      </div>
    </div>
  );
};

export default Card;
