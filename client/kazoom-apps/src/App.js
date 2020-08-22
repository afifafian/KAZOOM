import React from 'react';
import './App.css';
import { Home, CreateQuiz, Host, PlayGate, QuestionPage, Result } from './Pages';
// import { Provider } from 'react-redux';
// import store from './Store';
import { ApolloProvider } from '@apollo/client';
import client from './config';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/create" component={CreateQuiz}/>
            <Route exact path="/room" component={Host}/>
            <Route exact path="/player" component={PlayGate}/>
            <Route exact path="/question" component={QuestionPage}/>
            <Route exact path="/result" component={Result}/>
          </Switch>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
