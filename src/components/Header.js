import React, { useContext, useEffect, useState } from "react";
import { IoWalletOutline } from "react-icons/io5";
import { AppState } from "../App";
export default function Header() {
  const { ethereum } = window;
  const App = useContext(AppState);
  // const [showChains, setShowChains] = useState(true);
  const chains = ["Goerli", "Sepolia"];
  const chainId = ["0x5", "0xaa36a7"];
  const [values, setValues] = useState(App.chain);

  const handleChange = (e) => {
    setValues(e.target.value);
    // App.setChain(e.target.value);
  };
  const openMetamask = async () => {
    await ethereum.request({
      method: "wallet_requestPermissions",
      params: [{ eth_accounts: {} }],
    });
  };

  useEffect(() => {
    const changeChain = async () => {
      // if (value === App.chain.id)
      await ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: values }],
      });
      await ethereum.on("accountsChanged", (accounts) => {
        App.setAddress(accounts[0]);
      });
      App.setChain(values);

      console.log(values);
    };
    changeChain();
  });
  return (
    <div className="w-full h1/4 pt-4 px-2 flex items-start justify-between ">
      <img src="quickpay.png" className="h-14" />
      <div className="flex justify-center items-center gap-1">
        <div
          className="text-md mr-2 font-sans border-opacity-25 border border-blue-700  font-medium cursor-pointer bg-[#a7c3d5] px-4 py-1 text-semiBlue rounded-lg flex justify-between items-center"
          onClick={() => openMetamask()}
        >
          {App.address.slice(0, 8)}...{App.address.slice(38)}
          <IoWalletOutline className="text-darkBlue h-6 w-6 ml-1" />
        </div>
        {/* <div className="text-md py-1 px-3 mr-2 font-sans font-medium cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-between items-center">
          <img className="h-5 mr-2" src="ethereum-eth.svg" />
          {App.chain}
        </div> */}
        <select
          className="text-md px-1 py-1 outline-0 font-sans font-medium cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-between items-center"
          value={values}
          onChange={handleChange}
        >
          {chains.map((chain, index) => (
            <option key={chain} value={chainId[index]}>
              {chain}
            </option>
          ))}
        </select>

        {/* <div className={`${showChains}?'':'hidden' absolute right-2 z-50`}>
          {chains.map((chain) => (
            <div className="text-md py-1 px-3 mr-2 mb-1 font-sans font-medium cursor-pointer bg-semiBlue text-Blue rounded-lg flex justify-between items-center">
              <img className="h-5 mr-2" src="ethereum-eth.svg" />
              {chain}
            </div>
          ))}
        </div> */}
      </div>
    </div>
  );
}
