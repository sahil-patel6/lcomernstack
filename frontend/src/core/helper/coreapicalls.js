import { API } from "../../backend";

export const getAllProducts = () => {
    return fetch(`${API}/products`, {
        method: "GET",
    })
        .then((products) => {
            return products.json();
        })
        .catch((err) => console.log(err));
};
