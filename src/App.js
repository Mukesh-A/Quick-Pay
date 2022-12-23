import { createContext, useEffect, useState } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Login from "./components/Login";
import { Signer, ethers } from "ethers";

import "react-toastify/dist/ReactToastify.css";
const AppState = createContext();

function App() {
  const { ethereum } = window.ethereum;
  const [login, setLogin] = useState(false);
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("");
  const [balance, setBalance] = useState("");
  const [currency, setCurrency] = useState("");

  const [ercAddress, setErcAddress] = useState("");
  const [recipientAddress, setRecipientAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [quickPayContractAddress, setQuickPayContractAddress] =
    useState("0xc1742c1d2f8eb71c3f8f10bbe0662cf1283101cb");

  // const chainId = await signer.getChainId();
  // setChain(ethers.utils.hexlify(chainId));
  // useEffect(() => {
  //   async function runs() {
  //     // try {
  //     const provider =
  //       window.ethereum != null
  //         ? new ethers.providers.Web3Provider(window.ethereum)
  //         : ethers.providers.getDefaultProvider();
  //     const signer = provider.getSigner();
  //     const balance = await signer.getBalance();
  //     setBalance(ethers.utils.formatEther(balance));
  //     console.log(balance);
  //     // console.log(ethers.utils.hexlify(chainId));
  //     // } catch (error) {
  //     //   alert("insta;;");
  //     //   // ethers.providers.getDefaultProvider();
  //     // }
  //   }
  //   runs();
  // }, [chain]);

  // const provider = new ethers.providers.Web3Provider(ethereum);
  // const provider =
  //   ethereum !== null
  //     ? new ethers.providers.Web3Provider(ethereum).getSigner()
  //     : ethers.providers.getDefaultProvider();

  // const signer = provider.getSigner();
  // useEffect(() => {
  //   async function runs() {
  //     try {
  //       const provider = new ethers.providers.Web3Provider(ethereum);
  //       const signer = provider.getSigner();
  //       const balance = await signer.getBalance();
  //       setBalance(ethers.utils.formatEther(balance));
  //       // const _contract = new ethers.Contract(smartContratAdress, abi, signer);
  //       // setContract(_contract);
  //     } catch (err) {
  //       alert("Install Metamask or connect to metamask");
  //     }
  //   }
  //   runs();
  // });
  //useeffect should be added here i am adding it to header

  return (
    <AppState.Provider
      value={{
        setLogin,
        address,
        setAddress,
        chain,
        setChain,
        balance,
        setBalance,
        currency,
        setCurrency,
        recipientAddress,
        setRecipientAddress,
        amount,
        setAmount,
        ercAddress,
        setErcAddress,
        quickPayContractAddress,
        setQuickPayContractAddress,
      }}
    >
      <div className="min-w-full  h-screen">
        {login ? (
          <>
            <Header />
            <Main />
          </>
        ) : (
          <Login />
        )}
      </div>
    </AppState.Provider>
  );
}

export default App;
export { AppState };
