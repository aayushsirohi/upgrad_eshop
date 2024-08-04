export const TokenVerificationLoggedin = () => {
  let status = localStorage.getItem("token") ? true : false;
  if (!status) {
    window.location.replace("/login");
  }
};

export const TokenVerificationLoggedOut = () => {
  let status = localStorage.getItem("token") ? true : false;
  if (status) {
    window.location.replace("/products");
  }
};
