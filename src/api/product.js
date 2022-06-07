import { API } from "../config";


//   Product list
export const productInfo = () => {
    return fetch(`${API}/products`, {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};
//   Product details
export const productDetails = (id) => {
    return fetch(`${API}/products/${id}`, {
        method: "GET",
        Accept: "application/json",
        "Content-Type": "application/json",
    })
        .then((data) => {
            return data.json();
        })
        .catch((err) => {
            console.log(err);
        });
};