import React from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import AdminRoute from "./auth/helper/AdminRoutes";
import PrivateRoute from "./auth/helper/PrivateRoutes";
import UserDashboard from "./user/UserDashBoard";
import AdminDashboard from "./user/AdminDashBoard";
import Profile from "./user/Profile";
import AddCategory from "./admin/AddCategory";
import manageCategories from "./admin/manageCategories";
import AddProduct from "./admin/AddProduct";
import ManageProducts from "./admin/ManageProducts";
import UpdateProduct from "./admin/UpdateProduct";
import UpdateCategory from "./admin/updateCategory";
import Cart from "./core/Cart";

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/cart" exact component={Cart} />
                <PrivateRoute
                    path="/user/dashboard"
                    exact
                    component={UserDashboard}
                />
                <AdminRoute
                    path="/admin/dashboard"
                    exact
                    component={AdminDashboard}
                />
                <AdminRoute
                    path="/admin/create/category"
                    exact
                    component={AddCategory}
                />
                <AdminRoute
                    path="/admin/categories"
                    exact
                    component={manageCategories}
                />

                <AdminRoute
                    path="/admin/create/product"
                    exact
                    component={AddProduct}
                />
                <AdminRoute
                    path="/admin/products"
                    exact
                    component={ManageProducts}
                />
                <AdminRoute
                    path="/admin/product/update/:productId"
                    exact
                    component={UpdateProduct}
                />
                <AdminRoute
                    path="/admin/category/update/:categoryId"
                    exact
                    component={UpdateCategory}
                />
            </Switch>
        </BrowserRouter>
    );
}
