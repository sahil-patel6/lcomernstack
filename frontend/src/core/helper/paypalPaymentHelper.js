import { API } from "../../backend";

export const getToken = (userId, token) => {
    console.log(userId, token);
    return fetch(`${API}/paypalPayment/gettoken/${userId}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentInfo) => {
    return fetch(`${API}/paypalpayment/braintree/${userId}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentInfo),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
