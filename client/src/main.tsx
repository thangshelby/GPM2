import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
const router = createRouter({ routeTree });
import { RouterProvider } from "@tanstack/react-router";
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
