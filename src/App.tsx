import React from "react";
import AppProvider from "AppProvider";
import RoutesWrapper from "./routes";

import Header from "components/header";
import Footer from "components/footer";

function App() {
  return (
    <AppProvider>
      <Header />
      <RoutesWrapper />
      <Footer />
    </AppProvider>
  );
}

export default App;
