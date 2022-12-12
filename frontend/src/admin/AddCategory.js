import React, { useState } from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper";
import { Link } from "react-router-dom";
import { createCategory } from "./helper/adminapicall";
const AddCategory = () => {
    const [name, setName] = useState("");
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);

    const { user, token } = isAuthenticated();

    const goBack = () => {
        return (
            <div className="mt-5 m-4">
                <Link
                    className="btn btn-sm btn-info mb-3"
                    to="/admin/dashboard"
                >
                    Admin Home
                </Link>
            </div>
        );
    };

    const handleChange = (event) => {
        setError("");
        setName(event.target.value);
    };

    const onSubmit = (event) => {
        event.preventDefault();
        setError("");
        setSuccess(false);
        createCategory(user._id, token, { name })
            .then((data) => {
                if (data.error) {
                    setError(true);
                    setSuccess(false);
                } else {
                    setName("");
                    setError("");
                    setSuccess(true);
                }
            })
            .catch((err) => console.log(err));
    };

    const myCategoryForm = () => {
        return (
            <form>
                <div className="form-group m-4">
                    <p className="lead">Enter The Category Name</p>
                    <input
                        type="text"
                        className="form-control my-3"
                        autofocus
                        required
                        onChange={handleChange}
                        value={name}
                        placeholder="For ex. Summer"
                    />
                    <button onClick={onSubmit} className="btn btn-outline-info">
                        Create Category
                    </button>
                </div>
            </form>
        );
    };

    const successMessage = () => {
        if (success) {
            return (
                <h5 className="text-success m-4">
                    Category Created Successfully
                </h5>
            );
        }
    };

    const errorMessage = () => {
        if (error) {
            return (
                <h5 className="text-danger m-4">Failed To Create Category</h5>
            );
        }
    };

    return (
        <Base
            title="Create a category here"
            description="Add a new category for new tshirts"
            className="container bg-info p-4"
        >
            <div className="row bg-white rounded">
                <div className="col-md-8 offset-md-2">
                    {goBack()}
                    {successMessage()}
                    {errorMessage()}
                    {myCategoryForm()}
                    {JSON.stringify({ name, error, success })}
                </div>
            </div>
        </Base>
    );
};

export default AddCategory;
