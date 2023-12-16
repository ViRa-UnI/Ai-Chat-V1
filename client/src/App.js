import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ChatInterface from './components/ChatInterface';
import SettingsPanel from './components/SettingsPanel';
import './assets/styles/main.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route path="/chat" component={ChatInterface} />
            <Route path="/settings" component={SettingsPanel} />
            <Route exact path="/" component={LoginForm} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;