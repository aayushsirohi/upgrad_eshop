import React, { useEffect, useState } from "react";
import {
  Typography,
  Paper,
  Grid,
  makeStyles,
  Button,
  Box,
} from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import {
  notifycatch,
  notifyfailure,
  notifysuccess,
} from "../../common/Toast/toast";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(5),
    marginBottom: theme.spacing(2),
  },
  cardContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: theme.spacing(2),
  },
  centeredContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

function ConfirmAndReview({
  selectedAddressDetails,
  onConfirmOrder,
  productId,
  productName,
  category,
  price,
  quantity,
}) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const storedProductDetails = localStorage.getItem("productDetails");
    if (storedProductDetails) {
      setProductDetails(JSON.parse(storedProductDetails));
    }
  }, []);

  const handleConfirmOrder = async () => {
    try {
      if (productDetails && selectedAddressDetails) {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:8080/api/orders", {
          method: "POST",
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            quantity: productDetails.quantity,
            product: productDetails.id,
            address: selectedAddressDetails.id,
          }),
        });

        if (response.ok) {
          notifysuccess("Order created Successfully.");
          navigate("/products");
        } else {
          notifyfailure("Failed to create the order.");
        }
      } else {
        notifyfailure(
          "Product details or selected address details are missing."
        );
      }
    } catch (error) {
      notifycatch("An error occurred", error);
    }
  };

  return (
    <div>
      {/* <h2>Order Details</h2> */}
      <div className={classes.centeredContainer}>
        <Box className={classes.cardContainer}>
          <Paper className={classes.paper}>
            {productDetails && (
              <>
                <Typography variant="h6">Product:</Typography>
                <Typography>Name: {productDetails.name}</Typography>
                <Typography>Category: {productDetails.category}</Typography>
                <Typography>Price: Rs {productDetails.price}</Typography>
                <Typography>Quantity: {productDetails.quantity}</Typography>
              </>
            )}
          </Paper>

          <Paper className={classes.paper}>
            {selectedAddressDetails && (
              <>
                <Typography variant="h6">Shipping Address:</Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography>Name: {selectedAddressDetails.name}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      Contact Number: {selectedAddressDetails.contactNumber}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>City: {selectedAddressDetails.city}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      State: {selectedAddressDetails.state}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      Zip Code: {selectedAddressDetails.zipcode}
                    </Typography>
                  </Grid>
                  {selectedAddressDetails.landmark && (
                    <Grid item xs={12} sm={6}>
                      <Typography>
                        Landmark: {selectedAddressDetails.landmark}
                      </Typography>
                    </Grid>
                  )}
                  <Grid item xs={12}>
                    <Typography>
                      Street: {selectedAddressDetails.street}
                    </Typography>
                  </Grid>
                </Grid>
              </>
            )}
          </Paper>
        </Box>
      </div>

      <Button variant="contained" color="primary" onClick={handleConfirmOrder}>
        Place Order
      </Button>
    </div>
  );
}

export default ConfirmAndReview;
