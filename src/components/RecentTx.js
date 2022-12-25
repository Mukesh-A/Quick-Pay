import React, { useContext, useEffect, useState } from "react";
import quickPayAbi from "../quickpay/quickpay.json";
import { ethers } from "ethers";
import { AppState } from "../App";

export default function RecentTx() {
  const App = useContext(AppState);

  const [data, setdata] = useState([]);
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const QuickPayContract = new ethers.Contract(
    App.quickPayContractAddress,
    quickPayAbi.output.abi,
    signer
  );
  useEffect(() => {
    async function getData() {
      const tx = await QuickPayContract.filters.transactions(App.address);
      const txData = await QuickPayContract.queryFilter(tx);
      setdata(...data, txData);
      console.log("k", data);
    }
    getData();
  });
  return (
    <div className="w-full flex items-center justify-center whitespace-nowrap overflow-auto scrollbar-hide mt-5">
      {data.map((e) => {
        return (
          <div
            // key={index}
            className="w-5/6 flex flex-col items-center justify-center bg-semiBlue rounded-lg bg-opacity-70 border border-blue-700 border-opacity-50   mb-3 "
          >
            <div className=" w-5/6 py-2 px-1 flex flex-col ">
              <div className="w-full py-2  flex  justify-between">
                <p className="text-lg font-mono text-Blue">
                  Amount:{e.args.amount}
                </p>
                <button
                  // onClick={() => setRecipient(e?.args?.recipient)}
                  className="text-md px-2 outline-0 font-sans text-md cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-center items-center gap-1"
                >
                  send
                </button>
              </div>
              <p className="text-sm font-mono text-Blue">Acc:</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
