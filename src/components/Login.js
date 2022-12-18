import React, { useState, createContext, useContext } from "react";
import { AppState } from "../App";

export default function Login() {
  const App = useContext(AppState);
  const { ethereum } = window;
  const [error, setError] = useState("");
  const loginWallet = async () => {
    try {
      await ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      App.setLogin(true);
    } catch (error) {
      setError(`"${error.message}"`);
    }
  };

  return (
    <div className="min-w-full h-4/5 flex justify-center flex-col items-center ">
      <img className="h-25" src="quickpay.png" alt="logo" />
      {ethereum !== undefined ? (
        <div
          onClick={loginWallet}
          className="flex justify-center items-center py-1 px-2 cursor-pointer bg-[#0F4C75] rounded-lg "
        >
          <div className="flex text-xl   text-white px-1 ">
            Connect to Metamask
          </div>
          <img className="h-9 " src="metamask.png" alt="metamask" />
        </div>
      ) : (
        <a
          target={"_blank"}
          href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn"
        >
          <div className="flex justify-center items-center py-1 px-2 cursor-pointer bg-[#0F4C75] rounded-lg ">
            <div className="flex text-xl text-white px-1 ">
              Install Metamask
            </div>
            <img className="h-9 " src="metamask.png" alt="metamask" />
          </div>
        </a>
      )}
      <p className="text-[#0F4C75] text-lg mt-2">{error}</p>
    </div>
  );
}

// #F0EEEC
