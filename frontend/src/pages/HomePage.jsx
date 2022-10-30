import React from "react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

function HomePage() {
  return (
    <MainLayout>
      <div className="bg-light p-5 mt-4 rounded-3">
        <h1>Welcome to the POS for small business</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <p>If you have an issue, call 123-456.</p>
        <Link to="/pos" className="btn btn-primary">
          Click here to start
        </Link>
      </div>
    </MainLayout>
  );
}

export default HomePage;
