import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
    getAllCategories,
    getProduct,
    updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        updatedProduct: "",
        getRedirected: "",
        formData: "",
    });

    const {
        name,
        description,
        price,
        stock,
        photo,
        categories,
        category,
        loading,
        error,
        updatedProduct,
        getRedirected,
        formData,
    } = values;

    const preload = (productId) => {
        getProduct(productId).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    description: data.description,
                    price: data.price,
                    category: data.category._id,
                    stock: data.stock,
                    formData: new FormData(),
                });
                preloadCategories();
                console.log("CATE", categories);
            }
        });
    };

    const preloadCategories = () => {
        getAllCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    categories: data,
                    formData: new FormData(),
                });
            }
        });
    };

    useEffect(() => {
        preload(match.params.productId);
    }, []);

    const loadingMessage = () => {
        return (
            loading && (
                <div className="alert alert-info">
                    <h2>Loading...</h2>
                </div>
            )
        );
    };

    const onSubmit = (e) => {
        e.preventDefault();
        setValues({ ...values, error: "", loading: true });
        updateProduct(match.params.productId, user._id, token, formData)
            .then((val) => {
                if (val.error) {
                    setValues({ ...values, error: val.error, loading: false });
                } else {
                    setValues({
                        ...values,
                        loading: false,
                        name: "",
                        description: "",
                        price: "",
                        stock: "",
                        photo: "",
                        updatedProduct: val.name,
                    });
                }
            })
            .catch((err) => console.log(err));
    };

    const successMessage = () => {
        return (
            <div
                className="alert alert-success mt-3"
                style={{ display: updatedProduct ? "" : "none" }}
            >
                <h4>{updatedProduct} updated Successfully</h4>
            </div>
        );
    };

    const errorMessage = () => {
        return (
            <div
                className="alert alert-danger mt-3"
                style={{ display: error ? "" : "none" }}
            >
                <h4>{error}</h4>
            </div>
        );
    };

    const handleChange = (name) => (event) => {
        const value =
            name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
    };

    const createProductForm = () => (
        <form>
            <h5 className="mt-4 mb-4">Post photo</h5>
            <div className="form-group">
                <label className="btn btn-block btn-success">
                    <input
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image"
                        placeholder="choose a file"
                    />
                </label>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("name")}
                    name="photo"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                />
            </div>
            <div className="form-group">
                <textarea
                    onChange={handleChange("description")}
                    name="photo"
                    className="form-control"
                    placeholder="Description"
                    value={description}
                />
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("price")}
                    type="number"
                    className="form-control"
                    placeholder="Price"
                    value={price}
                />
            </div>
            <div className="form-group">
                <select
                    onChange={handleChange("category")}
                    className="form-control"
                    placeholder="Category"
                >
                    <option>Select</option>
                    {categories &&
                        categories.map((category, index) => {
                            return (
                                <option key={index} value={category._id}>
                                    {category.name}
                                </option>
                            );
                        })}
                </select>
            </div>
            <div className="form-group">
                <input
                    onChange={handleChange("stock")}
                    type="number"
                    className="form-control"
                    placeholder="Quantity"
                    value={stock}
                />
            </div>

            <button
                type="submit"
                onClick={onSubmit}
                className="btn btn-outline-success mb-4"
            >
                Update Product
            </button>
        </form>
    );
    return (
        <Base
            title="Add Product"
            description="Welcome to Prodct Creation Section"
            className="container bg-info p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-md btn-dark mb-3">
                Admin Home
            </Link>

            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2 ">
                    {loadingMessage()}
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </Base>
    );
};

export default UpdateProduct;
