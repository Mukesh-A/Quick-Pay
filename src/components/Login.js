import React, { useState, createContext, useContext } from "react";
import { AppState } from "../App";
import { Signer, ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
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
      App.setAddress(accounts[0]);

      const chainId = await ethereum.request({ method: "eth_chainId" });
      console.log(chainId, "login");
      if (chainId === "0x5") {
        App.setChain("0x5");
        App.setQuickPayContractAddress(
          "0xc1742c1d2f8eb71c3f8f10bbe0662cf1283101cb"
        );
        App.setExplorer("https://goerli.etherscan.io");
        // App.setCurrency("Goerli");
        // App.setBalance(ethers.utils.formatEther(balance));
      } else if (chainId === "0xaa36a7") {
        App.setChain("0xaa36a7");
        App.setQuickPayContractAddress(
          "0xc1742c1d2f8eb71c3f8f10bbe0662cf1283101cb"
        );
        App.setExplorer("https://sepolia.etherscan.io");
        // App.setCurrency("Sepolia");
      } else {
        setError();
        toast.error("Available only for Goerli and Sepolia chain", {
          position: toast.POSITION.TOP_LEFT,
          autoClose: 5000,
          closeOnClick: true,
          pauseOnHover: true,
          theme: "colored",
        });
        return App.setLogin(false);
      }

      //balance

      App.setLogin(true);
    } catch (error) {
      // alert(error.message);
      toast.error(error.message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
    }
  };

  return (
    <div className="min-w-full h-4/5 flex justify-center flex-col items-center ">
      <img className="h-30" src="quickpay.png" alt="logo" />
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
          rel="noreferrer"
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

      {/* <p className="text-[#0F4C75] text-lg mt-2">{error}</p> */}
      <ToastContainer />
    </div>
  );
}

// #F0EEEC
