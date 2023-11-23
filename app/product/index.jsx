"use client";

import React, { useEffect, useState } from "react";
import Card from "@/components/card";
import Loading from "@/components/loading";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSortChange = (criteria) => {
    if (sortBy === criteria) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(criteria);
      setSortOrder("asc");
    }
  };

  const sortedData = data
    ? [...data].sort((a, b) => {
        switch (sortBy) {
          case "price":
            return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
          case "category":
            return sortOrder === "asc"
              ? a.category.localeCompare(b.category)
              : b.category.localeCompare(a.category);
          default:
            return sortOrder === "asc"
              ? a.title.localeCompare(b.title)
              : b.title.localeCompare(a.title);
        }
      })
    : null;

  const handleFilterChange = (event) => {
    setFilterCategory(event.target.value);
  };

  const filteredData = sortedData
    ? filterCategory === "all"
      ? sortedData
      : sortedData.filter((product) => product.category === filterCategory)
    : null;

  return (
    <section className="container mx-auto py-5 px-5">
      <h1 className="font-serif">Fake Shop Product Page</h1>
      <div className="flex flex-col lg:flex-row items-center justify-between gap-5 my-5 text-teal-600 text-lg">
        <div className="flex flex-wrap lg:flex-nowrap space-y-2 lg:space-y-0 space-x-2 lg:space-x-4">
          <button
            onClick={() => handleSortChange("name")}
            className={`${
              sortBy === "name" && "font-bold"
            } hover:underline cursor-pointer focus:outline-none mt-2 md:mt-0 md:mb-2 lg:mb-0 lg:mr-4`}
          >
            Name {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <button
            onClick={() => handleSortChange("price")}
            className={`${
              sortBy === "price" && "font-bold"
            } hover:underline cursor-pointer focus:outline-none mb-2 lg:mb-0 lg:mr-4`}
          >
            Price {sortOrder === "asc" ? "↑" : "↓"}
          </button>
          <button
            onClick={() => handleSortChange("category")}
            className={`${
              sortBy === "category" && "font-bold"
            } hover:underline cursor-pointer focus:outline-none mb-2 lg:mb-0 lg:mr-4`}
          >
            Category {sortOrder === "asc" ? "↑" : "↓"}
          </button>
        </div>

        <div className="ml-4">
          <label htmlFor="categoryFilter">Filter by Category:</label>
          <select
            id="categoryFilter"
            onChange={handleFilterChange}
            value={filterCategory}
            className="ml-2 p-2 border rounded focus:outline-none"
          >
            <option value="all">All Categories</option>
            {/* Add options dynamically based on available categories */}
            {data &&
              Array.from(new Set(data.map((product) => product.category))).map(
                (category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                )
              )}
          </select>
        </div>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 justify-center items-center gap-5 my-10">
          {filteredData &&
            filteredData.map((product) => (
              <Card key={product.id} product={product} />
            ))}
        </div>
      )}
    </section>
  );
};

export default Products;
