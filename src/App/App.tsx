import React from "react";
import { Routes, Route } from "react-router-dom";
// import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";

import logo from "./logo.svg";
import "./App.css";

// const theme = createTheme({
//   palette: {
//     primary: {
//       dark: '#000000',
//     },
//   },
// });

const App = () => {
  return (
    // <ThemeProvider theme={theme}>
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>
    </Routes>
    // </ThemeProvider>
  );
};

export default App;
