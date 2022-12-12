import React, { useState, useEffect } from "react";
import { loadCart, emptyCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getToken, processPayment } from "../core/helper/paypalPaymentHelper";
import { createOrder } from "./helper/orderHelper";
import { isSignedIn, isAuthenticated } from "../auth/helper";
import DropIn from "braintree-web-drop-in-react";

const PaypalPayment = ({
    products,
    setReload = (f) => f,
    reload = undefined,
}) => {
    const [info, setInfo] = useState({
        loading: false,
        success: false,
        clientToken: null,
        error: "",
        instance: {},
    });

    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;

    const loadToken = (userId, token) => {
        getToken(userId, token)
            .then((info) => {
                if (info.error) {
                    setInfo({ ...info, error: info.error });
                } else {
                    const clientToken = info.clientToken;
                    setInfo({ clientToken });
                }
            })
            .catch((err) => console.log(err));
    };

    const showbtDropIn = () => {
        return (
            <div>
                {info.clientToken !== null && products.length > 0 ? (
                    <div>
                        <DropIn
                            options={{ authorization: info.clientToken }}
                            onInstance={(instance) =>
                                (info.instance = instance)
                            }
                        />
                        <button
                            className="btn btn-block btn-success"
                            onClick={onPurchase}
                        >
                            Buy
                        </button>
                    </div>
                ) : (
                    <h3>Please login or add something to cart</h3>
                )}
            </div>
        );
    };

    useEffect(() => {
        loadToken(userId, token);
    }, []);

    const onPurchase = () => {
        setInfo({ loading: true });
        let nonce;
        let getNonce = info.instance.requestPaymentMethod().then((data) => {
            nonce = data.nonce;
            const paymentData = {
                paymentMethodNonce: nonce,
                amount: getAmount(),
            };
            processPayment(userId, token, paymentData)
                .then((response) => {
                    setInfo({
                        ...info,
                        success: response.success,
                        loading: false,
                    });
                    console.log("PAYMENT SUCCESS");
                    const orderData = {
                        products: products,
                        transaction_id: response.transaction.id,
                        amount: response.transaction.amount,
                    };
                    createOrder(userId, token, orderData);
                    emptyCart(() => {
                        console.log("cart is empty");
                    });
                    setReload(!reload);
                })
                .catch((err) => {
                    console.log("PAYMENT FAILED");
                    setInfo({ loading: false, success: false });
                });
        });
    };

    const getAmount = () => {
        let amount = 0;
        products.map((product) => {
            amount = amount + product.price;
        });
        return amount;
    };

    return (
        <div>
            <h1>Pay With Paypal</h1>
            {showbtDropIn()}
        </div>
    );
};

export default PaypalPayment;
