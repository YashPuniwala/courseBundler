  import axios from "axios";
import { buySubscriptionFail, buySubscriptionRequest, buySubscriptionSuccess, cancelSubscriptionFail, cancelSubscriptionRequest, cancelSubscriptionSuccess } from "../reducers/subscriptionReducer";
  
  export const buySubscription = () => async (dispatch) => {
    try {
      dispatch(buySubscriptionRequest());
      const { data } = await axios.get(
        `api/v1/subscribe`,
        {
          withCredentials: true,
        }
      );
      dispatch(buySubscriptionSuccess(data.subscriptionId));
      console.log(data.subscriptionId, "data.subscriptionId")
    } catch (error) {
      dispatch(
        buySubscriptionFail(
          error.response ? error.response.data.message : "Unknown error occurred"
        )
      );
    }
  };


  export const cancelSubscription = () => async (dispatch) => {
    try {
      dispatch(cancelSubscriptionRequest());
      const { data } = await axios.delete(
        `api/v1/subscribe/cancel`,
        {
          withCredentials: true,
        }
      );
      dispatch(cancelSubscriptionSuccess(data.message));
      console.log(data.message, "data.message")
    } catch (error) {
      dispatch(
        cancelSubscriptionFail(
          error.response ? error.response.data.message : "Unknown error occurred"
        )
      );
    }
  };