import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
const loading = () => <div> Loading... </div>;
const Login = React.lazy(() => import('./view/Login/Login'));
const Home = React.lazy(() => import('./view/Home/Home'));

export class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route exact path="/login" name="login" render={props => <Login {...props} />} />
            <Route exact path="/" name="home" render={props => <Home {...props} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
