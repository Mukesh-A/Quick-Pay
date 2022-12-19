import { createContext, useEffect, useState } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Login from "./components/Login";

const AppState = createContext();

function App() {
  const [login, setLogin] = useState(false);
  const [address, setAddress] = useState("");
  const [chain, setChain] = useState("");
  // useEffect(async () => {
  //   await ethereum.on("accountsChanged", (accounts) => {
  //     App.setAddress(accounts[0]);
  //   });
  // });

  //useeffect should be added here i am adding it to header

  return (
    <AppState.Provider
      value={{ setLogin, address, setAddress, chain, setChain }}
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
