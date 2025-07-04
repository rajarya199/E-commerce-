import React, { useState, useEffect } from "react";
import axios from "axios";

import { API } from "../config";
import { isAuthenticated } from "../auth";
const AddProduct = () => {
  const [categories, setCategory] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}/categorylist`)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  //destructure token
  const { token } = isAuthenticated();
  const [productData, setProductData] = useState({
    product_name: "",
    product_price: "",
    countInStock: "",
    product_description: "",
    product_image: "",
    category: "",
  });
  const { product_name, product_price, countInStock, product_description } =
    productData;
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (pdata) => (event) => {
    setProductData({
      ...productData,
      error: false,
      [pdata]: event.target.value,
    });
  };
  const handleImageChange = (e) => {
    setProductData({ ...productData, product_image: e.target.files[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("product_name", product_name);
      formData.append("product_price", product_price);
      formData.append("product_description", product_description);
      formData.append("countInStock", countInStock);
      formData.append("product_image", productData.product_image);
      formData.append("category", productData.category);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.post(`${API}/postproduct`, formData, config);
      setSuccess(true);
      setError(false);
      setProductData({
        product_name: "",
        product_price: "",
        countInStock: "",
        product_description: "",
        product_image: "",
        category: "",
      });
    } catch (err) {
      setError(err.response.data.error);
      setSuccess(false);
    }
  };
 const showError = () => (
  <div
  style={{display:error ? '':'none'}}
    className={`bg-red-800 border border-red-500 text-red-100 px-4 py-3 rounded mb-4 shadow-md transition-opacity duration-300 `}
    role="alert"
  >
    {error}
  </div>
);

const showSuccess = () => (
  <div
  style={{display:success ? '':'none'}}
    className={`bg-amber-700 border border-amber-500 text-amber-100 px-4 py-3 rounded mb-4 shadow-md transition-opacity duration-300 ` }
    role="alert"
  >
    New Product added
  </div>
);
  return (
    <>
<div className="container mx-auto px-4">
  <div className="flex justify-center">
    <div className="w-full max-w-lg">
      <form
        className="shadow-lg p-6 rounded-lg bg-vnbg-100 border border-vnbrd-100"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-vntx-100 text-2xl font-semibold mb-6">
          Add Product
        </h3>
        {showError()}
        {showSuccess()}

        <div className="mb-4">
          <label
            htmlFor="pname"
            className="block mb-1 font-medium text-vntx-200"
          >
            Product Name
          </label>
          <input
            type="text"
            id="pname"
            className="w-full px-3 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-vntx-200"
            onChange={handleChange('product_name')}
            value={product_name}
            placeholder="Enter product name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block mb-1 font-medium text-vntx-200"
          >
            Price
          </label>
          <input
            type="number"
            id="price"
            className="w-full px-3 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-vntx-200"
            onChange={handleChange('product_price')}
            value={product_price}
            placeholder="Enter price"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="qty"
            className="block mb-1 font-medium text-vntx-200"
          >
            Stock Quantity
          </label>
          <input
            type="number"
            id="qty"
            className="w-full px-3 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-vntx-200"
            onChange={handleChange('countInStock')}
            value={countInStock}
            placeholder="Enter stock quantity"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="desc"
            className="block mb-1 font-medium text-vntx-200"
          >
            Product Description
          </label>
          <textarea
            id="desc"
            className="w-full px-3 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 placeholder-vninpl-100 focus:outline-none focus:ring-2 focus:ring-vntx-200"
            onChange={handleChange('product_description')}
            value={product_description}
            placeholder="Enter product description"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            htmlFor="image"
            className="block mb-1 font-medium text-vntx-200"
          >
            Image
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            className="w-full text-vntx-400"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="category"
            className="block mb-1 font-medium text-vntx-200"
          >
            Category
          </label>
         <select
  id="category"
  className="w-full px-3 py-2 border border-vnbrd-100 rounded bg-vninp-100 text-vntx-400 focus:outline-none focus:ring-2 focus:ring-vntx-200"
  onChange={handleChange('category')}
  value={productData.category || ''}
>
  <option value="" className="text-vninpl-100">
    Select a category
  </option>
  {categories.map((c, i) => (
    <option key={i} value={c._id}>
      {c.category_name}
    </option>
  ))}
</select>

        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-vnbtn-100 hover:bg-vnbtn-200 text-vnbg-100 font-semibold py-2 rounded transition-colors duration-200"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  </div>
</div>


    </>
  );
};

export default AddProduct;
