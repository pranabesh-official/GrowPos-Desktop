import React from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom"
import './scss/style.scss';
import './App.css';
import Login from './views/LogIn'
import View from './views';
import { Ripple } from 'react-preloaders';



function App(props) {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<Ripple/>}>
        <Switch>
          <Route path="/dashbord" component={View} />
          <Route path="/" component={Login} />
        </Switch>
      </React.Suspense>
    </BrowserRouter>

  );
}
export default App;