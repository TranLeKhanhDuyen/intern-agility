// import React from "react";
// import { connect } from "react-redux";

// import Login from "./Auth/Login";

// interface AppProps {
//   isLoggedIn: boolean;
// }

// const App: React.FC<AppProps> = () => {
//   return <Login />;
// };

// const mapStateToProps = (state: any) => {
//   return {
//     isLoggedIn: state.user.isLoggedIn,
//   };
// };

// export default connect(mapStateToProps)(App);

// =======================================================

// import { connect } from "react-redux";
// import { Route, Router } from "react-router-dom";
// import { history } from "../redux";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import {
  userIsAuthenticated,
  userIsNotAuthenticated,
} from "../hoc/authentication";

import { path } from "../utils";

import Home from "../routes/Home";
import Login from "../routes/Login";
import Header from "./Header/Header";
import System from "../routes/System";
import { connect } from 'react-redux';

interface AppProps {
  isLoggedIn: boolean;
  path: string;
  exact: true;
  component: any
}

const App = ({isLoggedIn}: AppProps) => {

    return (
        // <Router history={history}>
        <Router>
          <div className="main-container">
            {isLoggedIn && <Header items={[]} />}

            <span className="content-container">
              <Router>
                <Route path={path.HOME} element={<Home />} />
                <Route
                  path={path.LOGIN}
                  element={userIsNotAuthenticated(Login)}
                />
                <Route
                  path={path.SYSTEM}
                  element={userIsAuthenticated(System)}
                />
              </Router>
            </span>
          </div>
        </Router>
    );
}

const mapStateToProps = (state: any) => {
  return {
    started: state.app.started,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = () => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
