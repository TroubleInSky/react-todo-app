import './App.css';
import { Provider } from 'react-redux';
import storage from './services/storage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from './routes/Home';
import SignIn from './routes/SignIn';
function App() {
  return (
      <Provider store={storage}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/"><Home/></Route>
              <Route path="/login"><SignIn/></Route>
            </Switch>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
