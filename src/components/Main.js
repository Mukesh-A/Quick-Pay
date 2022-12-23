import React, { useContext, useEffect } from "react";
import MainRoute from "./MainRoute";
import { Signer, ethers } from "ethers";
import { AppState } from "../App";

export default function Main() {
  const App = useContext(AppState);

  useEffect(() => {
    async function runs() {
      const provider =
        window.ethereum != null
          ? new ethers.providers.Web3Provider(window.ethereum)
          : ethers.providers.getDefaultProvider();
      const signer = provider.getSigner();
      const balance = await signer.getBalance();
      App.setBalance(ethers.utils.formatEther(balance));
      console.log(ethers.utils.formatEther(balance));

      if (App.chain === "0x5") {
        App.setCurrency("Goreli");
      } else if (App.chain === "0xaa36a7") {
        App.setCurrency("Sepolia");
      }
    }
    runs();
  }, [App.chain, App.address]);
  return (
    <div className="grid place-items-center h-96 ">
      <div className="border-opacity-25 border border-blue-700 rounded-lg shadow-lg shadow-blue-500/50">
        <MainRoute />
      </div>
    </div>
  );
}
