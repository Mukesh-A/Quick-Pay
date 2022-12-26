import React from "react";
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";
import RecentTx from "./RecentTx";
import Recipients from "./Recipients";
import Send from "./Send";
export default function MainRoute() {
  return (
    <BrowserRouter className="">
      <ul className="flex flex-shrink flex-row justify-center items-center gap-16 text-xl font-medium cursor-pointer bg-semiBlue px-5 py-2 text-Blue rounded-t-lg sm:gap-3 lg:gap-16">
        <li className="px-3">
          <Link to="/">Send</Link>
        </li>
        <li className="p-2">
          <Link to="/recipients">Recipients</Link>
        </li>
        <li className="p-2 ">
          <Link to="/recenttx">RecentTx</Link>
        </li>
      </ul>
      <Routes>
        <Route path="/" element={<Send />} />
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/recenttx" element={<RecentTx />} />
      </Routes>
    </BrowserRouter>
  );
}
