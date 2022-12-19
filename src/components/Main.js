import React from "react";
import MainRoute from "./MainRoute";

export default function Main() {
  return (
    <div className="flex flex-col justify-center items-center mt-8 ">
      <div className="border-opacity-25 border border-blue-700 rounded-lg">
        <MainRoute />
      </div>
    </div>
  );
}
 