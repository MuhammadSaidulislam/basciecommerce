import { API } from "../config";


//  user registration
export const registerForm = (user) => {
    console.log('userRegister', user);
    console.log(API);
    return fetch(`${API}/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};
// user login
export const loginForm = (user) => {
    //  console.log(API)
    return fetch(`${API}/login`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((res) => {
            return res.json();
        })
        .catch((err) => {
            return err;
        });
};

export const authenticate = (data, next) => {
    if (typeof window !== undefined) {
        localStorage.setItem("jwt", JSON.stringify(data));
        next();
    }
};

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

export const productDetail = (id) => {
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



// item add localstroage
export const addItem = (item, next) => {
    let cart = [];
    if (typeof window != "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }
        cart.push({ ...item, count: 1 });

        cart = Array.from(new Set(cart.map((p) => p.id))).map((id) => {
            return cart.find((p) => p.id === id);
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        next();
    }
};
//get total cart item
export const getCart = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            return JSON.parse(localStorage.getItem("cart"));
        }
    }
    return [];
};


//update cart
export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== "undefined") {
        if (localStorage.getItem("cart")) {
            cart = JSON.parse(localStorage.getItem("cart"));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};





// cart product emplty
//remove item from cart
export const removeItem = (productId) => {
    console.log(productId);
    let cart = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
  
      cart.map((product, i) => {
          console.log(product);
        if (product.id === productId) {
          cart.splice(i, 1);
        }
      });
  
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  
    return cart;
  };
  
  //empty cart
  export const emptyCart = (next) =>{
    if(typeof window !== "undefined"){
      localStorage.removeItem('cart');

    }
  }