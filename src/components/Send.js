import React, { useContext, useState } from "react";
import { GiTwoCoins } from "react-icons/gi";
import { MdVerified } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import { Bars, TailSpin } from "react-loader-spinner";
import { AppState } from "../App";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import quickPayAbi from "../quickpay/quickpay.json";

export default function Send() {
  const App = useContext(AppState);

  const [ERC, setERC] = useState(false);
  const [ercLoading, setErcLoading] = useState(false);
  const [transferLoading, setTransferLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [verify, setVerify] = useState(true);
  // const [symbol, setSymbol] = useState("gEth");

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const ERCABI = [
    "function balanceOf(address) view returns (uint)",
    "function transfer(address to, uint amount) returns (bool)",
    "function symbol() external view returns (string memory)",
    "function name() external view returns (string memory)",
  ];

  const ErcContract = new ethers.Contract(App.ercAddress, ERCABI, signer);

  const manageLoading = async () => {
    try {
      if (!ercLoading && checking) {
      } else {
        setErcLoading(true);
        const name = await ErcContract.name();
        const balance = await ErcContract.balanceOf(App.address);
        const symbol = await ErcContract.symbol();
        App.setBalance(ethers.utils.formatEther(balance));
        // App.setSymbol(symbol);
        App.setCurrency(name);
        setChecking(true);
        setTimeout(() => setErcLoading(false), 3000);
        setTimeout(() => setVerify(false), 1000);
        // setVerify(false);
      }
    } catch (error) {
      toast.error(error.message, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: 5000,
        closeOnClick: true,
        pauseOnHover: true,
        theme: "colored",
      });
      setErcLoading(false);
    }
  };
  const removeToken = () => {
    if (App.chain === "0x5") {
      App.setCurrency("Goreli");
    } else if (App.chain === "0xaa36a7") {
      App.setCurrency("Sepolia");
    }

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
    App.setErcAddress("");
    setERC(false);
    setVerify(true);
    setChecking(false);
  };

  const transfer = async () => {
    try {
      if (verify === false) {
        setTransferLoading(true);
        console.log("erc");
        //in smart contract we have to pass value as wei,so we take value from users as ethers convert it it wei and send to contract
        const tx = await ErcContract.transfer(
          App.recipientAddress,
          ethers.utils.parseEther(App.amount)
        );
        await tx.wait();
        setTransferLoading(false);

        toast.success("Transferred Successfully with ERC", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        console.log("address");
        setTransferLoading(true);
        const QuickPayContract = new ethers.Contract(
          App.quickPayContractAddress,
          quickPayAbi.output.abi,
          signer
        );
        const tx = await QuickPayContract._transfer(
          App.recipientAddress,
          "gEth",
          {
            value: ethers.utils.parseEther(App.amount),
          }
        );
        await tx.wait();
        setTransferLoading(false);
        toast.success("Transferred Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (err) {
      setTransferLoading(false);

      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  return (
    <div className="flex flex-col justify-center items-center my-5">
      <div className="w-5/6 flex justify-between items-center  mt-3 ">
        <div
          onClick={() => !setERC(!ERC)}
          className="flex cursor-pointer justify-center items-center gap-2 p-1 bg-blueWhite font-sans  border border-opacity-50 border-blue-700  font-medium  bg-opacity-70 rounded-lg text-semiBlue"
        >
          <GiTwoCoins className="h-5 w-5" />
          <p>ERC20</p>
        </div>
        <div className=" flex cursor-pointer justify-center items-center gap-2 p-1 bg-semiBlue font-sans  border border-opacity-50 border-blue-700  font-medium  bg-opacity-70 rounded-lg text-Blue">
          <IoWalletOutline className=" h-5 w-5 ml-1" />
          <p>{App.currency}:</p>
          <p>{App.balance.slice(0, 5)} ETH</p>
        </div>
      </div>

      {/* //transaction */}
      {ERC && (
        <div className="w-5/6 flex justify-between items-center gap-x-3 mt-5 ">
          <input
            type="text"
            onChange={(e) => App.setErcAddress(e.target.value)}
            value={App.ercAddress}
            placeholder="Enter ERC-20 Address"
            className="w-5/6 p-2 bg-darkBlue placeholder:italic placeholder:text-Blue border-1 border-opacity-50 border-blue-700  font-medium  bg-opacity-10 rounded-lg text-semiBlue outline-none"
          />
          {verify ? (
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
                <>verify</>
              )}
            </button>
          ) : (
            <button
              onClick={() => removeToken()}
              className="text-md px-3 py-1  outline-0 font-sans text-lg cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-center items-center gap-1"
            >
              Remove
            </button>
          )}
        </div>
      )}

      <div className="w-5/6 flex justify-between items-center gap-x-3 mt-5 ">
        <input
          type="text"
          onChange={(e) => App.setRecipientAddress(e.target.value)}
          value={App.recipientAddress}
          placeholder="Enter Address"
          className="w-5/6 p-2 bg-darkBlue placeholder:italic placeholder:text-Blue border-1 border-opacity-50 border-blue-700  font-medium  bg-opacity-10 rounded-lg text-semiBlue outline-none"
        />
        <input
          type="number"
          onChange={(e) => App.setAmount(e.target.value)}
          value={App.amount}
          placeholder="value"
          className="w-1/5  text-md px-3 py-2  outline-0 font-sans text-md cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-center items-center gap-1"
        />
      </div>
      <div
        onClick={transfer}
        className="w-5/6 flex justify-center items-center gap-x-3 mt-5 "
      >
        <button className="w-full text-md px-3 py-2 font-medium  outline-0 font-sans text-lg cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-center items-center gap-1">
          {transferLoading ? (
            <Bars width={30} height={40} color={"#a7c3d5"} />
          ) : (
            "Transfer Amount"
          )}
        </button>
      </div>

      {/* Recent Tx section */}
      <div
        className={`w-5/6 bg-semiBlue rounded-lg bg-opacity-70 border border-blue-700 border-opacity-50  mt-2`}
      >
        <div className="flex w-full flex-col items-center justify-center rounded-t-lg">
          <div className="w-4/6 py-2 px-2 flex flex-col items-center ">
            <p className="text-sm font-mono text-Blue">
              Acc:0xDB632661B625605D7661073D75c0BC031A60B26C{" "}
            </p>
            <div className="w-full  flex items-center justify-between gap-x-2 font-mono text-sm cursor-pointer text-opacity-30">
              <p className="text-md font-mono text-Blue">Amount: 0.001 </p>
              <a target={"_blank"}>View Transaction</a>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 font-medium font-mono bg-opacity-80   py-1 mr-2 rounded-md">
            <button
              onClick={() => removeToken()}
              className="text-sm px-3   outline-0 font-sans text-lg cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-center items-center gap-1"
            >
              Save
            </button>
            {/* } */}
            <button
              onClick={() => removeToken()}
              className="text-sm px-3   outline-0 font-sans text-lg cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-center items-center gap-1"
            >
              Ignore
            </button>
            {/* <TailSpin height={18} width={18} color={"white"} /> */}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

// 0xC1742C1d2f8eB71C3f8f10bBE0662cf1283101cb
// 0xC1742C1d2f8eB71C3f8f10bBE0662cf1283101cb
