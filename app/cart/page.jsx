"use client";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart";

const ShoppingCart = () => {
  const { cartItems, setCartItems } = useCart();
  const [deliveryLocation, setDeliveryLocation] = useState("insideDhaka");

  useEffect(() => {
    const storedCartItems =
      JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (productId, newQuantity) => {
    newQuantity = Math.max(newQuantity, 1);

    setCartItems((prevCartItems) =>
      prevCartItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (productId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== productId)
    );
  };

  const calculateDeliveryCharge = () => {
    const deliveryCharges = {
      insideDhaka: 0, // inside Dhaka
      outsideDhaka: 3.00, //outside Dhaka
    };

    return deliveryCharges[deliveryLocation];
  };

  const handleCheckout = () => {
    const totalWithDelivery = calculateTotalPrice() + calculateDeliveryCharge();
    console.log("Checkout button clicked");
    console.log("Total with delivery:", totalWithDelivery.toFixed(2));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  return (
    <div className="h-auto md:h-fit  py-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-6 rounded-lg bg-white p-6 shadow-md flex flex-col md:flex-row md:items-center"
            >
              <img
                src={item.image}
                alt="product-image"
                className="w-full rounded-lg sm:w-40 mb-4 md:mb-0 md:mr-4"
              />
              <div className="sm:ml-4 flex flex-col sm:flex-row sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">
                    {item.name}
                  </h2>
                  <p className="mt-1 text-xs text-gray-700">{item.size}</p>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <span
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"
                    >
                      -
                    </span>
                    <input
                      className="h-8 w-8 border bg-white text-center text-xs outline-none"
                      type="number"
                      value={item.quantity}
                      min="1"
                      readOnly
                    />
                    <span
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"
                    >
                      +
                    </span>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <p className="text-sm">{item.price.toFixed(2)} $</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6 cursor-pointer text-red-600 hover:text-red-400 duration-300"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 md:mt-0 md:w-1/3 bg-white h-fit p-2 rounded-lg border shadow-lg">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${calculateTotalPrice().toFixed(2)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Income tax</p>
            <p className="text-gray-700">$2.00</p>
          </div>
          <div className="flex justify-between mb-2 my-2">
            <p className="text-gray-700">Delivery Location</p>
            <select
              className="outline-none p-1 text-teal-600"
              value={deliveryLocation}
              onChange={(e) => setDeliveryLocation(e.target.value)}
            >
              <option value="insideDhaka">Inside Dhaka</option>
              <option value="outsideDhaka">Outside Dhaka</option>
            </select>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Delivery Charges</p>
            <p className="text-gray-700">${calculateDeliveryCharge().toFixed(2)}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">
                ${(
                  calculateTotalPrice() +
                  calculateDeliveryCharge() +
                  2.0
                ).toFixed(2)}{" "}
                USD
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            className="mt-6 w-full rounded-md bg-teal-600 py-1.5 font-medium text-blue-50 hover:bg-teal-500 duration-500"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
