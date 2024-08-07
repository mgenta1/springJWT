import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./Components/UserContext"; // Import UserProvider

import Login from "./Components/Login";
import Register from "./Components/User"; // Import Register component
import UserDetails from "./Components/UserDetails";
import UpdateUser from "./Components/UpdateUser";
import UsersList from "./Components/UsersList";
import AffectRole from "./Components/AffectRole";
import UserDashboard from "./Components/UserDashboard";
import AdminDashboard from "./Components/AdminDashboard";
import LoggedUserDetails from "./Components/LoggedUserDetails"; // Import LoggedUserDetails
import Logout from "./Components/Logout"; // Import Logout
import ForgotPassword from "./Components/ForgotPassword"; // Import ForgotPassword
import CheckEmail from "./Components/CheckEmail"; // Import CheckEmail
import ResetPassword from "./Components/ResetPassword"; // Import ResetPassword
import RoleSelection from "./Components/RoleSelection";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/check-email" element={<CheckEmail />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/role-selection" element={<RoleSelection />} />

          {/* User-specific routes */}
          <Route path="/home" element={<UserDashboard />}>
            <Route
              path="logged-user-details/:userId"
              element={<LoggedUserDetails />}
            />
          </Route>
          <Route path="/logout" element={<Logout />} />
          {/* Admin-specific routes */}
          <Route path="/admin" element={<AdminDashboard />}>
            <Route path="affect-role" element={<AffectRole />} />
            <Route path="users" element={<UsersList />} />
            <Route path="user-details/:id" element={<UserDetails />} />
            <Route path="update-user/:id" element={<UpdateUser />} />
          </Route>
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
