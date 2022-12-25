import React, { useState, useContext, useEffect } from "react";
import { AppState } from "../App";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import quickPayAbi from "../quickpay/quickpay.json";
import { useNavigate } from "react-router-dom";
export default function Recipients() {
  const App = useContext(AppState);
  const navigate = useNavigate();
  const [RrecipientAddress, setRrecipientAddress] = useState("");
  const [RrecipientName, setRrecipientName] = useState("");
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
      const recipients = await QuickPayContract.filters.recipients(App.address);
      const recipientsData = await QuickPayContract.queryFilter(recipients);
      setdata(...data, recipientsData);
      console.log("k", data);
    }
    getData();
  }, []);

  const addRecipient = async () => {
    try {
      const tx = await QuickPayContract.addRecipient(
        RrecipientAddress,
        RrecipientName
      );
      await tx.wait();
      setRrecipientAddress("");
      setRrecipientName("");
      toast.success("Recipient Saved Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (err) {
      toast.error(err.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const setRecipient = (address) => {
    App.setRecipientAddress(address);
    navigate("/");
  };
  return (
    <div className=" flex flex-col items-center justify-center py-6 px-4 text-white gap-3">
      <input
        type="text"
        onChange={(e) => setRrecipientAddress(e.target.value)}
        value={RrecipientAddress}
        placeholder="Enter Recipients Address"
        className="w-5/6 p-2  bg-darkBlue placeholder:italic placeholder:text-Blue border-1 border-opacity-50 border-blue-700  font-medium  bg-opacity-10 rounded-lg text-semiBlue outline-none"
      />

      <input
        type="text"
        onChange={(e) => setRrecipientName(e.target.value)}
        value={RrecipientName}
        placeholder="Enter Recipients Name"
        className="w-5/6  p-2 bg-darkBlue placeholder:italic placeholder:text-Blue border-1 border-opacity-50 border-blue-700  font-medium  bg-opacity-10 rounded-lg text-semiBlue outline-none"
      />

      <button
        onClick={addRecipient}
        className="w-5/6 text-md mt-2 px-3 py-2 font-medium  outline-0 font-sans text-lg cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-center items-center gap-1"
      >
        Add Recipients
      </button>

      {/* <p className="text-red-600 text-lg mt-2 px-3">tr</p>
      <p className="text-green-600 text-lg mt-2 px-1">rtd</p> */}
      <div className="w-5/6 whitespace-nowrap overflow-auto scrollbar-hide max-h-32 ">
        {data.map((e, index) => {
          console.log(e, index);

          return (
            <div
              key={index}
              className=" flex flex-col items-center justify-center w-full bg-semiBlue rounded-lg bg-opacity-70 border border-blue-700 border-opacity-50  mt-2 "
            >
              <div className="w-full py-2 px-1 flex flex-col ">
                <div className="w-full py-2 px-1 flex  justify-between">
                  <p className="text-lg font-mono text-Blue px-0">
                    Name:{e?.args?.recipientName}
                  </p>
                  <button
                    onClick={() => setRecipient(e?.args?.recipient)}
                    className="text-md px-2 outline-0 font-sans text-md cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-center items-center gap-1"
                  >
                    send
                  </button>
                </div>
                <p className="text-sm font-mono text-Blue">
                  Acc:{e?.args?.recipient}
                </p>
              </div>
            </div>
          );
        })}{" "}
      </div>
      <ToastContainer />
    </div>
  );
}
