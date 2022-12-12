import React, { useState, useEffect } from "react";

import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./stripeCheckout";
import PaypalPayment from "./PaypalPayment";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = (products) => {
        return (
            <div>
                <h2>This section is to load products</h2>
                {products.map((product, index) => {
                    return (
                        <Card
                            key={index}
                            product={product}
                            removeFromCart={true}
                            addToCart={false}
                            setReload={setReload}
                            reload={reload}
                        />
                    );
                })}
            </div>
        );
    };

    const loadCheckout = () => {
        return (
            <div>
                <h2>This section is for checkout</h2>
            </div>
        );
    };
    return (
        <Base title="Cart Page" description="Ready To Checkout">
            <div className="row text-center">
                <div className="col-6">
                    {products.length > 0 ? (
                        loadAllProducts(products)
                    ) : (
                        <h3>No Products in cart</h3>
                    )}
                </div>
                <div className="col-6">
                    {
                        <StripeCheckout
                            products={products}
                            setReload={setReload}
                        />
                    }
                    <PaypalPayment products={products} setReload={setReload} />
                </div>
            </div>
        </Base>
    );
};

export default Cart;
