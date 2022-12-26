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
      setdata(txData);
      console.log("k", data);
    }
    getData();
  }, []);
  return (
    <div className="w-80 m-auto flex flex-col justify-center items-center">
      <div className="w-full h-96 flex flex-col items-center justify-center whitespace-nowrap overflow-auto scrollbar-hide mt-5 ">
        {data.map((e) => {
          return (
            <div
              // key={index}
              className="w-full  flex flex-col items-center justify-center bg-semiBlue rounded-lg bg-opacity-70 border border-blue-700 border-opacity-50   mb-3 "
            >
              <div className=" w-full py-2  flex flex-col px-2">
                <div className="w-full py-2  flex  justify-between">
                  <p className="text-lg font-mono text-Blue">
                    Amount:{ethers.utils.formatEther(e.args.amount)}{" "}
                    {e.args.symbol}
                  </p>
                  <a
                    target={"_blank"}
                    rel="noreferrer"
                    href={`${App.explorer}/tx/${e.transactionHash}`}
                  >
                    View Transaction
                  </a>
                </div>
                <p className="text-sm font-mono text-Blue">
                  Acc:{e.args.to.slice(0, 20)}...{e.args.to.slice(30)}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
