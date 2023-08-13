import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { buySubscription } from "../../redux/actions/subscriptionAction";
import { AlertContext } from "../../App";
import { buySubscriptionReset } from "../../redux/reducers/subscriptionReducer";
import LearningImage from "../../assets/images/learningImage.png";

const Subscribe = ({ user }) => {
  const [key, setKey] = useState("");
  const { showAlert } = useContext(AlertContext);

  const dispatch = useDispatch();

  const { loading, error, message, subscriptionId } = useSelector(
    (state) => state.subscription
  );
  const { error: getAllLecturesError } = useSelector((state) => state.course);

  const subscribeHandler = async () => {
    const {
      data: { key },
    } = await axios.get(`api/v1/razorPayKey`);
    setKey(key);
    dispatch(buySubscription());
  };

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch(buySubscriptionReset());
    }

    if (getAllLecturesError) {
      showAlert("error", getAllLecturesError);
      dispatch(buySubscriptionReset());
    }

    if (subscriptionId) {
      const openPopUp = () => {
        const options = {
          key,
          name: "CourseBundler",
          description: "Get access to all premium content",
          image: LearningImage,
          subscription_id: subscriptionId,
          callback_url: `api/v1/paymentVerification`,
          prefill: {
            name: user.name,
            email: user.email,
            contact: "",
          },
          notes: {
            address: "Yash Puniwala At Youtube",
          },
          theme: {
            color: "#FFC800",
          },
        };
        const razor = new window.Razorpay(options);
        razor.open();
      };
      openPopUp();
    }
  }, [
    dispatch,
    showAlert,
    error,
    getAllLecturesError,
    message,
    user.name,
    user.email,
    key,
    subscriptionId,
  ]);

  return (
    <Box
      sx={{
        p: { xs: 7, sm: 13 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Welcome</Typography>
      <Stack
        sx={{
          boxShadow: "2px 2px 2px 0px rgba(0, 0, 0, 0.2)",
          marginTop: "40px",
        }}
      >
        <Box
          sx={{
            p: 2,
            backgroundColor: "#FFEA20",
            color: "black",
            borderRadius: "8px 8px 0 0 ",
          }}
        >
          <Typography>Prop Pack - $299.00</Typography>
        </Box>

        <Box
          sx={{
            padding: "45px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "240px", sm: "300px" },
            textAlign: "center",
          }}
        >
          <Typography sx={{ marginBottom: "15px" }}>
            Join pro pack and get access to all content.
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontFamily: "bold", fontSize: "28px" }}
          >
            $299 only
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              color: "black",
              width: "90%",
              textTransform: "none",
              fontSize: "15px",
              backgroundColor: "#FFEA20",
              ":hover": {
                backgroundColor: "#FFE600",
              },
            }}
            onClick={subscribeHandler}
            disabled={loading}
          >
            Buy Now
          </Button>
        </Box>

        <Box
          sx={{
            backgroundColor: "#444444",
            color: "white",
            marginTop: "30px",
            padding: "20px",
            borderRadius: "0 0 8px 8px ",
          }}
        >
          <Typography>100% REFUND ON CANCELLATION</Typography>
          <Typography variant="body2">*Terms & Conditions Apply</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Subscribe;
