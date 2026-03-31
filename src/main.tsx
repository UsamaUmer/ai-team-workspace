import './styles/global.css';
import './styles/variables.css';

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./app/routes.tsx";

/// testing login function of store
// import { useAppStore } from "./app/store.ts";

// const store = useAppStore.getState();
// console.log(store.login("alisuper@saas.com", "alisuperAdmin"));
// console.log(useAppStore.getState().currentUser);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>,
);
