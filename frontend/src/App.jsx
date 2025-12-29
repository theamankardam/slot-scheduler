import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ReactQueryProvider from "./features/providers/ReactQueryProvider";
import { Toaster } from "react-hot-toast";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import ProtectedRoute from "./components/ProtectedRoute";
import Applayout from "./Applayout";
import PageNotFound from "./pages/PageNotFound";
import MyCalender from "./pages/MyCalender";
import MarketPlace from "./pages/MarketPlace";
import Notification from "./pages/Notification";

export default function App() {
  return (
    <ReactQueryProvider>
      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <Applayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="myCalender" />} />
            <Route path="myCalender" element={<MyCalender />} />
            <Route path="marketPlace" element={<MarketPlace />} />
            <Route path="notification" element={<Notification />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{
          margin: "8px",
        }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </ReactQueryProvider>
  );
}
