import React, { useEffect } from "react";
import DataBox from "./dataBox";
import Sidebar from "../sidebar";
import Bar from "../adminDashboard/bar";
import LineChart, { DoughnutChart } from "./lineChart";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../layout/loader/loader";
import { getDashboardStats } from "../../../redux/actions/adminAction";

const Dashboard = () => {
  const {
    loading,
    stats,
    usersCount,
    subscriptionCount,
    viewsCount,
    subscriptionPercentage,
    viewsPercentage,
    usersPercentage,
    subscriptionProfit,
    viewsProfit,
    usersProfit,
  } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  return (
    <Box
      sx={{ height: { xs: "290vh", sm: "250vh" }, backgroundColor: "#212121" }}
    >
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ height: "100vh", color: "white" }}>
          <Box
            sx={{
              padding: { xs: "1rem", sm: "3rem" },
              boxSizing: "border-box",
            }}
          >
            <Typography
              sx={{ color: "grey", textAlign: "center" }}
            >{`Last change was on ${
              String(new Date(stats && stats[11].createdAt)).split("G")[0]
            }`}</Typography>

            {/* {stats && stats.length >= 12 && (
              <Typography
                sx={{ color: "grey", textAlign: "center" }}
              >{`Last change was on ${
                String(new Date(stats[11].createdAt)).split("G")[0]
              }`}</Typography>
            )} */}

            <Typography
              sx={{
                marginTop: "40px",
                textAlign: "center",
              }}
              variant="h4"
            >
              Dashboard
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent={{ xs: "space-between", sm: "space-evenly" }}
              spacing={{ xs: 5, sm: 10 }}
              sx={{ marginTop: "50px" }}
            >
              <DataBox
                title="Views"
                qty={viewsCount}
                qtyPercentage={viewsPercentage}
                profit={viewsProfit}
              />
              <DataBox
                title="Users"
                qty={usersCount}
                qtyPercentage={usersPercentage}
                profit={usersProfit}
              />
              <DataBox
                title="Subscription"
                qty={subscriptionCount}
                qtyPercentage={subscriptionPercentage}
                profit={subscriptionProfit}
              />
            </Stack>

            <Box
              sx={{
                borderRadius: "5px",
                padding: { xs: "2rem", sm: "40px" },
                boxShadow: "-2px 0 10px rgba(0, 0, 0, 0.4)",
                width: { xs: "16rem", sm: "70rem" },
                margin: "auto",
                marginTop: "50px",
              }}
            >
              <Typography
                sx={{ textAlign: { xs: "center", sm: "left" } }}
                variant="h5"
              >
                View Graph
              </Typography>

              {/* Line Graph */}
              <LineChart views={stats && stats.map((item => item.views))}/>
            </Box>

            <Stack
              justifyContent="space-evenly"
              direction={{ xs: "column", sm: "row", md: "row" }}
              sx={{ width: "330px", margin: "auto", marginTop: "50px" }}
            >
              <Box>
                <Typography
                  sx={{
                    ml: { xs: 0, sm: 8 },
                    textAlign: { xs: "center", sm: "left" },
                  }}
                  variant="h5"
                >
                  Progress Bar
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Bar
                    profit={viewsProfit}
                    title="Views"
                    value={viewsPercentage}
                  />
                  <Bar
                    profit={usersProfit}
                    title="Users"
                    value={usersPercentage}
                  />
                  <Bar
                    profit={subscriptionProfit}
                    title="Subscription"
                    value={subscriptionPercentage}
                  />
                </Box>
              </Box>

              <Box sx={{ marginTop: "10px" }}>
                <Typography
                  sx={{ margin: "20px", textAlign: "center" }}
                  variant="h5"
                >
                  User
                </Typography>
                <Box>
                  <DoughnutChart
                    users={[subscriptionCount, usersCount - subscriptionCount]}
                  />
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>
      )}

      <Sidebar />
    </Box>
  );
};

export default Dashboard;
