import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import Applayout from "./pages/Applayout";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/myCalender"
          element={
            <ProtectedRoute>
              <Applayout />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        /> */}
        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
