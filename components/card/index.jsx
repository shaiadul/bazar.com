"use client";
import React, { useState } from "react";

const Card = ({ product }) => {
  const { title, price, description, category, image } = product;
  const [isFavorite, setIsFavorite] = useState(false);
  return (
    <div className="w-full bg-white drop-shadow-md rounded-lg overflow-hidden  border-4 border-solid border-teal-200">
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
          <a
            href="#"
            className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-center text-sm text-white rounded duration-300"
          >
            Add to Cart
          </a>

          <a
            href="#"
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
