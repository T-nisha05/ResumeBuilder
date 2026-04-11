import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  const { loading } = useContext(UserContext);

  return (
    <div>
      <Navbar />

      {loading ? (
        <div className="text-center mt-10 text-gray-500">
          Loading...
        </div>
      ) : (
        <div className="container mx-auto pt-4 pb-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;