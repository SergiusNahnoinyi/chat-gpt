import { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { CircularProgress } from "@mui/material";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const ErrorPage = lazy(() => import("./pages/ErrorPage/ErrorPage"));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <CircularProgress
            style={{
              margin: 0,
              position: "absolute",
              top: "50%",
              left: "50%",
              color: "#b3befe"
            }}
          />
        }
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
