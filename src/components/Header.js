import React from "react";
import { IoWalletOutline } from "react-icons/io5";
export default function Header() {
  return (
    <div className="w-full h1/4 pt-4 px-2 flex items-start justify-between ">
      <img src="quickpay.png" className="h-14" />
      <div className="flex justify-center items-center">
        <div className="text-xl mr-2 font-sans border-opacity-60 border-2 border-blue-900 font-medium cursor-pointer bg-black px-4 py-2 text-white rounded-lg flex justify-between items-center">
          <IoWalletOutline className="text-Blue"/>
        </div>
      </div>
    </div>
  );
}
