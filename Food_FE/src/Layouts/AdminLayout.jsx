import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Sections/Navbar";
import Footer from "./Sections/Footer";
import SideBarAdmin from "./Sections/SideBarAdmin";

export default function AdminLayout() {
  return (
    <main className="flex">
      <SideBarAdmin />
      <Outlet />
    </main>
  );
}
