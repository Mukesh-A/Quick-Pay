import React, { useContext, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { TailSpin } from "react-loader-spinner";
import { AppState } from "../App";

export default function Send() {
  const App = useContext(AppState);

  const [ERC, setERC] = useState(false);
  const [ercLoading, setErcLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [ercAddress, setErcAddress] = useState("");
  // console.log(App.balance);
  const manageLoading = () => {
    setErcLoading(true);
    setChecking(true);
  };
  return (
    <div className=" flex flex-col justify-center items-center">
      <div className="w-5/6 flex justify-between items-center  mt-5 ">
        <div
          onClick={() => !setERC(!ERC)}
          className="flex cursor-pointer justify-center items-center gap-2 p-1 bg-blueWhite font-sans  border border-opacity-50 border-blue-700  font-medium  bg-opacity-70 rounded-lg text-semiBlue"
        >
          <GiTwoCoins className="h-5 w-5" />
          <p>ERC20</p>
        </div>
        <div className=" flex cursor-pointer justify-center items-center gap-2 p-1 bg-semiBlue font-sans  border border-opacity-50 border-blue-700  font-medium  bg-opacity-70 rounded-lg text-Blue">
          <IoWalletOutline className=" h-5 w-5 ml-1" />
          <p>{App.chain === "0x5" ? "Goerli" : "Sepolia"}:</p>
          <p>{App.balance.slice(0, 5)} ETH</p>
        </div>
      </div>

      {/* //transaction */}
      {ERC && (
        <div className="w-5/6 flex justify-between items-center gap-x-3 mt-5 ">
          <input
            type="text"
            onChange={(e) => setErcAddress(e.target.value)}
            placeholder="Enter ERC-20 Address"
            className="w-5/6 p-2 bg-darkBlue placeholder:italic placeholder:text-Blue border-1 border-opacity-50 border-blue-700  font-medium  bg-opacity-10 rounded-lg text-semiBlue outline-none"
          />
          <button
            onClick={() => manageLoading()}
            className="text-md px-3 py-1  outline-0 font-sans text-lg cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-center items-center gap-1"
          >
            {ercLoading ? (
              <>
                {!checking ? (
                  <TailSpin height={28} color={"#a7c3d5"} />
                ) : (
                  <>
                    <MdVerified /> verified
                  </>
                )}
              </>
            ) : (
              <>
                {/*  */}
                verify
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
