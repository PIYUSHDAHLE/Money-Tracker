import "@/styles/globals.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from './store'
import { Provider } from "react-redux";
import App from "./App.tsx";
import { Provider as HeroUiProvider } from "./provider.tsx";
import "../src/styles/globals.css";
import LenisInit from "./LenisInit.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
        <BrowserRouter>
          <HeroUiProvider>
             <LenisInit>
            <App />
             </LenisInit>
          </HeroUiProvider>
        </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

