import React from "react";
import AdminAppBar from "./AdminAppBar";
import { Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <AdminAppBar />
      <main>
        <Outlet /> {/* This is where child routes will be rendered */}
      </main>
    </div>
  );
};

export default AdminDashboard;
