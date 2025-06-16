import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "./Sections/Navbar";
import Footer from "./Sections/Footer";

export default function PageLayout() {
  return (
    <main className=" relative">
      <Navbar />
      <div id="body" className="xl:mt-auto">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}
