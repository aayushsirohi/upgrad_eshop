import { toast } from "react-toastify";

export const notifysuccess = (msg) =>
  toast.success(msg, {
    autoClose: 1500,
    position: "top-center",
  });

export const notifyfailure = (msg) =>
  toast.error(msg, {
    autoClose: 1500,
    position: "top-center",
  });

export const notifycatch = (msg) =>
  toast.error(msg, {
    autoClose: 1500,
    position: "top-center",
  });
