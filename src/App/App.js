import React from "react";
import { Main } from "../Main"
import NavBar from "../Components/NavBar";
import Footer from '../Components/Footer';
// import ChattBox from "../Components/ChattBox";

export const App = () => (
  <main>
    <NavBar />
    <Main />
    {/* <ChattBox /> */}
    <Footer />
  </main>
);