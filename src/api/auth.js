import { API } from "../config";



export const authenticate = (data, next) => {
  if (typeof window !== undefined) {
    localStorage.setItem("jwt", JSON.stringify(data));
    next();
  }
};

//is authenticte
export const isAuthenticate = () => {
  if (typeof window == undefined) {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};


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



