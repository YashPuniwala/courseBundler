import React, {
  useState,
  createContext,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Alert } from "@mui/material";
import Home from "./components/home/home";
import DarkHeader from "../src/components/layout/header/darkHeader";
import Courses from "../src/components/courses/courses";
import CoursePage from "../src/components/coursePage/coursePage";
import Contact from "../src/components/contact/contact";
import Profile from "../src/components/profile/profile";
import ChangePassword from "../src/components/profile/changePassword";
import UpdateProfile from "./components/profile/updateProfile";
import Footer from "./components/layout/footer/footer";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import ForgetPassword from "./components/auth/forgetPassword";
import ResetPassword from "./components/auth/resetPassword";
import Request from "./components/request/request";
import About from "./components/about/about";
import Subscribe from "./components/payments/subscribe";
import NotFound from "./components/layout/notFound/notFound";
import PaymentSuccess from "./components/payments/paymentSuccess";
import PaymentFail from "./components/payments/paymentFail";
import Dashboard from "./components/admin/adminDashboard/dashboard";
import CreateCourses from "./components/admin/adminCreateCourses/createCourses";
import AdminCourses from "./components/admin/adminCourses/adminCourses";
import Users from "./components/admin/users/users";
import CoursesModal from "./components/admin/adminCourses/coursesModal";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "./redux/actions/userAction";
import { ProtectedRoute } from "protected-route-react";
import Loader from "./components/layout/loader/loader";
import "./App.css";
import GetCourseDetails from "./components/admin/adminCourses/getCourseDetails";
import UpdateCourseModal from "./components/admin/adminCourses/updateCourseModal";
import EditCourseLecturePage from "./components/admin/adminCourses/editCourseLecturePage"

export const AlertContext = createContext();

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

function App() {
  const [alert, setAlert] = useState(null);
  const [courseId, setCourseId] = useState("")

  const dispatch = useDispatch();

  const { isAuthenticated, user, message, error, loading } = useSelector(
    (state) => state.user
  );

  const showAlert = useCallback((severity, message, description) => {
    setAlert({ severity, message, description });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  }, []);

  const onCloseAlert = useCallback(() => {
    setAlert(null);
  }, []);

  useEffect(() => {
    if (error) {
      showAlert("error", error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      showAlert("success", message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, showAlert]);

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader />
      ) : (
        <AlertContext.Provider value={{ showAlert }}>
          <div>
            {alert && (
              <Alert
                severity={alert.severity}
                onClose={onCloseAlert}
                style={{
                  position: "absolute",
                  left: "565px",
                  top: "30px",
                }}
              >
                {alert.message}
                <br />
                {alert.description}
              </Alert>
            )}
          </div>
          <Wrapper>
            <DarkHeader isAuthenticated={isAuthenticated} user={user} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/courses" element={<Courses />} />
              <Route
                path="/course/:id"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <CoursePage user={user} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Profile user={user} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/changePassword"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <ChangePassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/updateProfile"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <UpdateProfile user={user} />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<Contact />} />
              <Route path="/request" element={<Request />} />
              <Route path="/about" element={<About />} />

              <Route
                path="/login"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <Login />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/register"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <Register />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/forgetpassword"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <ForgetPassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/resetPassword/:token"
                element={
                  <ProtectedRoute
                    isAuthenticated={!isAuthenticated}
                    redirect="/profile"
                  >
                    <ResetPassword />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/subscribe"
                element={
                  <ProtectedRoute isAuthenticated={isAuthenticated}>
                    <Subscribe user={user} />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
              <Route path="/paymentSuccess" element={<PaymentSuccess />} />
              <Route path="/paymentFail" element={<PaymentFail />} />

              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/createCourses"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <CreateCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/adminCourses"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <AdminCourses />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <Users />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/coursesModal"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <CoursesModal />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/updateCourseModal"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <UpdateCourseModal />
                  </ProtectedRoute>
                }
              />


              <Route
                path="/admin/editCourseLecturePage"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <EditCourseLecturePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/admin/getCourseDetails/:id"
                element={
                  <ProtectedRoute
                    isAuthenticated={isAuthenticated}
                    adminRoute={true}
                    isAdmin={user && user.role === "admin"}
                  >
                    <GetCourseDetails />
                  </ProtectedRoute>
                }
              /> 
               {/* This Route is just made for test */}
            </Routes>
          </Wrapper>
          <Footer />
        </AlertContext.Provider>
      )}
    </Router>
  );
}

export default App;
