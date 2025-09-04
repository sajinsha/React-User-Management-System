import React, { useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const displayName = user?.displayName || user?.email || "User";
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
        {/* Logo and nav links (left-aligned for custom800 and above) */}
        <div className="flex items-center gap-12">
          <div
            className="text-2xl custom800:text-3xl font-[900] italic text-blue-900 cursor-pointer font-sans"
            style={{ fontFamily: "Montserrat, Arial, sans-serif" }}
            onClick={() => navigate("/products")}
          >
            FashionHub
          </div>
          <ul className="hidden custom800:flex space-x-10 text-lg font-semibold text-gray-700">
            <li className="hover:text-blue-900 cursor-pointer text-[14px]">
              Category
            </li>
            <li className="hover:text-blue-900 cursor-pointer text-[14px]">
              Brand
            </li>
            <li className="hover:text-blue-900 cursor-pointer text-[14px]">
              Contact
            </li>
            <li className="hover:text-blue-900 cursor-pointer text-[14px]">
              FAQ's
            </li>
          </ul>
        </div>
        {/* Hamburger: show below 800px only */}
        <button
          className="custom800:hidden flex items-center justify-center p-2 rounded focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu"
        >
          <svg
            className="w-7 h-7 text-blue-900"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {/* User section (hidden on mobile) */}
        <div className="hidden custom800:flex items-center space-x-4">
          {/* Notification badge with icon */}
          <div className="relative sm:right-[30px]">
            <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
              <img
                src="./playstoreicon.svg"
                alt="Notification Icon"
                className="w-5 h-5"
              />
            </div>
            <span className="absolute -top-1 -right-1 bg-blue-900 text-white text-xs font-bold rounded-full px-2 py-0.5 border-2 border-white">
              3
            </span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block"></span>
              <span className="text-xs text-gray-400 font-semibold">
                Good Morning!
              </span>
            </div>
            <span
              onClick={() => navigate("/profile")}
              className="font-bold text-blue-900 text-base cursor-pointer"
            >
              {displayName}
            </span>
          </div>
        </div>
      </div>
      {/* Hamburger menu drawer for screens < 800px */}
      {menuOpen && (
        <div className="custom800:hidden bg-white border-t border-gray-200 shadow-lg">
          <ul className="flex flex-col py-2 px-6 text-lg font-semibold text-gray-700">
            <li className="py-3 hover:text-blue-900 cursor-pointer border-b text-[14px]">
              Category
            </li>
            <li className="py-3 hover:text-blue-900 cursor-pointer border-b text-[14px]">
              Brand
            </li>
            <li className="py-3 hover:text-blue-900 cursor-pointer border-b text-[14px]">
              Contact
            </li>
            <li className="py-3 hover:text-blue-900 cursor-pointer text-[14px]">
              FAQ's
            </li>
          </ul>
          {/* Mobile user info and cart icon for screens < 800px */}
          <div className="flex items-center justify-between px-6 py-4 border-t">
            <div className="flex flex-col items-start">
              <span className="w-2 h-2 rounded-full bg-red-400 inline-block mb-1"></span>
              <span className="text-xs text-gray-400 font-semibold">
                Good Morning!
              </span>
              <span
                className="font-bold text-blue-900 text-base cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {displayName}
              </span>
            </div>
            <div className="relative">
              <div className="bg-gray-100 rounded-full w-10 h-10 flex items-center justify-center">
                <img
                  src="./playstoreicon.svg"
                  alt="Notification Icon"
                  className="w-5 h-5"
                />
              </div>
              <span className="absolute -top-1 -right-1 bg-blue-900 text-white text-xs font-bold rounded-full px-2 py-0.5 border-2 border-white">
                3
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function HeroBanner() {
  return (
    <div className="flex flex-col md:flex-row items-center [@media(max-width:768px)]:gap-[20px] justify-between bg-gradient-to-r
     from-indigo-100 to-purple-100 rounded-2xl p-8 my-8">
      <div className="flex-1 sm:mt-[50px]">
        <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-blue-900 mb-4">
          Grab Upto 50% Off On Selected Headphone
        </h1>
        <button className="bg-blue-900 text-white md:relative md:top-[40px] px-8 py-2 md:py-3 rounded-full text-[14px] md:text-lg font-semibold">
          Buy Now
        </button>
      </div>
      <div className="flex-1 flex justify-end  [@media(max-width:768px)]:w-full">
        <img
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=cover&w=300&q=80"
          alt="Banner"
          className="md:w-64 w-full  h-64 object-cover rounded-2xl"
        />
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  console.log("PRRODUCT", product);
  return (
    <div className="bg-white rounded-2xl shadow-lg p-0 relative flex flex-col border border-gray-200 w-full  mx-auto min-h-[370px]">
      {/* Heart icon top right */}
      <div className="absolute top-4 right-4">
        <button className="text-gray-300 hover:text-red-500">
          <FaHeart size={24} />
        </button>
      </div>
      {/* Product image */}
      <div className="flex items-center mt-[40px] justify-center h-40 w-full bg-gray-50 rounded-t-2xl">
        <img
          src={product.image}
          alt={product.title}
          className="h-32 w-32 object-contain mb-2 
             transition-transform duration-300 ease-in-out 
             hover:scale-110 hover:rotate-1"
        />
      </div>
      {/* Card content */}
      <div className="w-full px-6 pb-6 pt-4 flex flex-col flex-grow">
        {/* Title and Price */}
        <div className="flex items-baseline justify-between mb-1">
          <h3 className="font-semibold text-left text-base text-gray-800">
            {product.title.length > 8
              ? product.title.slice(0, 15) + "..."
              : product.title}
          </h3>
          <p className="text-right text-blue-900 font-bold text-base whitespace-nowrap">
            ₹ {product?.price}
          </p>
        </div>

        {/* Category */}
        <p className="text-left text-gray-500 text-xs mb-2">
          {product.category}
        </p>

        {/* Description */}
        <p className="text-left text-gray-500 text-xs mb-2">
          {product.description?.slice(0, 40) || "5 types of shoes available"}
        </p>

        <div className="flex items-center mb-2 gap-2">
          <Rating name="read-only" value={product?.rating?.rate} readOnly />
          <Typography style={{ fontSize: "12px" }} component="legend">
            {product?.rating?.count}
          </Typography>
        </div>
        <div className="flex w-full gap-2 mt-auto">
          <button className="flex-1 bg-blue-900 text-white py-2 rounded-full font-semibold hover:bg-blue-800 transition text-xs">
            Add To Cart
          </button>
          <button className="flex-1 border border-blue-900 text-blue-900 py-2 rounded-full font-semibold hover:bg-blue-50 transition text-xs">
            Add Shortlist
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="w-full py-20  bg-white border-t mt-12 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} FashionHub. All rights reserved.
    </footer>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  useEffect(() => {
    setFiltered(
      products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, products]);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="max-w-7xl mx-auto px-4 flex-1 flex min-h-full w-full">
        <div className="w-full">
          <Navbar />
          <HeroBanner />
          <input
            type="text"
            placeholder="Search by title..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-8 p-3 w-full border-[2px] border-gray-700 rounded-lg shadow-sm"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 min-h-[370px]">
            {filtered?.length === 0 && search ? (
              <div className="col-span-full flex flex-col items-center justify-center w-full py-12">
                <p className="text-lg text-gray-500 font-semibold">
                  No search results found
                </p>
              </div>
            ) : (
              filtered?.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>
        </div>
      </div>
      {/* Static Pagination - centered below grid */}
      <div className="w-full flex justify-center items-center mt-8 mb-4">
        {/* Desktop/Tablet Pagination */}
        <nav aria-label="Pagination" className="hidden md:block">
          <ul className="flex space-x-2 justify-center items-center bg-white rounded-lg px-4 py-3 shadow-sm">
            <li>
              <button className="px-3 py-1 text-sm rounded border border-gray-200 bg-gray-50 text-gray-500 font-semibold cursor-pointer hover:bg-gray-100">Previews</button>
            </li>
            <li>
              <button className="px-3 py-1 text-sm rounded border border-gray-200 bg-purple-50 text-purple-700 font-bold cursor-pointer">1</button>
            </li>
            <li>
              <button className="px-3 py-1 text-sm rounded border border-gray-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-100">2</button>
            </li>
            <li>
              <button className="px-3 py-1 text-sm rounded border border-gray-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-100">3</button>
            </li>
            <li>
              <button className="px-3 py-1 text-sm rounded border border-gray-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-100">4</button>
            </li>
            <li>
              <button className="px-3 py-1 text-sm rounded border border-gray-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-100">5</button>
            </li>
            <li>
              <button className="px-3 py-1 text-sm rounded border border-gray-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-100">6</button>
            </li>
            <li>
              <button className="px-3 py-1 text-sm rounded border border-gray-200 bg-white text-gray-700 cursor-pointer hover:bg-gray-100">7</button>
            </li>
            <li>
              <button className="px-3 py-1 text-sm rounded border border-gray-200 bg-gray-50 text-gray-500 font-semibold cursor-pointer hover:bg-gray-100">Next</button>
            </li>
          </ul>
        </nav>
        {/* Mobile Pagination */}
        <nav aria-label="Pagination" className="md:hidden w-full">
          <ul className="flex justify-between items-center bg-white rounded-lg px-4 py-3 shadow-sm w-full">
            <li>
              <button className="px-3 py-1 text-xs rounded border border-gray-200 bg-gray-50 text-gray-500 font-semibold cursor-pointer hover:bg-gray-100">Prev</button>
            </li>
            <li>
              <button className="px-3 py-1 text-xs rounded border border-gray-200 bg-purple-50 text-purple-700 font-bold cursor-pointer">1</button>
            </li>
            <li>
              <button className="px-3 py-1 text-xs rounded border border-gray-200 bg-gray-50 text-gray-500 font-semibold cursor-pointer hover:bg-gray-100">Next</button>
            </li>
          </ul>
        </nav>
      </div>
      <Footer />
    </div>
  );
}

export default Products;
