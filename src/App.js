import { createContext, useState } from "react";
import Main from "./components/Main";
import Header from "./components/Header";
import Login from "./components/Login";

const AppState = createContext();

function App() {
  const [login, setLogin] = useState(false);
  return (
    <AppState.Provider value={{ setLogin }}>
      <div className="min-w-full h-screen">
        {!login ? (
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
