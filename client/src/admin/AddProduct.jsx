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
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-success"
      style={{ display: success ? "" : "none" }}
    >
      new product added
    </div>
  );
  return (
    <>
      <div className="container">
        <div className="row d-flex justify-content-center">
          <div className="col-md-6">
            <form className="shadow p-3">
              <h3 className="text-center text-muted">Add Product</h3>
              {showError()}
              {showSuccess()}
              <div className="mb-2">
                <label htmlFor="pname">Product Name</label>
                <input
                  type="text"
                  id="pname"
                  className="form-control"
                  onChange={handleChange("product_name")}
                  value={product_name}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  className="form-control"
                  onChange={handleChange("product_price")}
                  value={product_price}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="qty">Stock Quantity</label>
                <input
                  type="number"
                  id="qty"
                  className="form-control"
                  onChange={handleChange("countInStock")}
                  value={countInStock}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="desc">Product Description</label>
                <textarea
                  className="form-control"
                  id="desc"
                  onChange={handleChange("product_description")}
                  value={product_description}
                ></textarea>
              </div>
              <div className="mb-2">
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  className="form-control"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>
              <div className="mb-2">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  onChange={handleChange("category")}
                >
                  <option></option>
                  {categories.map((c, i) => (
                    <option key={i} value={c._id}>
                      {c.category_name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <button className="btn btn-primary" onClick={handleSubmit}>
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
