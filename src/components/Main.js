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
    }
    runs();
  }, [App.chain, App.address]);
  return (
    <div className="flex fl ex-col justify-center items-center mt-8 ">
      <div className="border-opacity-25 border border-blue-700 rounded-lg">
        <MainRoute />
      </div>
    </div>
  );
}
