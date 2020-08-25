import React from 'react';
import './App.css';
import { Home, CreateQuiz, PlayGate, Room } from './Pages';
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
          <div style={{background: '#BD632F'}}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/create" component={CreateQuiz}/>
              <Route exact path="/player" component={PlayGate}/>
              <Route path="/room/:id" component={Room}/>
            </Switch>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
