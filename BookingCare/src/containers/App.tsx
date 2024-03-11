import React from "react";
import { connect } from "react-redux";

import Login from "./Auth/Login";

interface AppProps {
  isLoggedIn: boolean;
}

const App: React.FC<AppProps> = () => {
  return <Login />;
};

const mapStateToProps = (state: any) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

export default connect(mapStateToProps)(App);
