import React, {useState} from 'react';
import './App.css';
import {
  Navbar,
  Button
} from 'reactstrap';
import { Home, CreateQuiz, PlayGate, Room, Login, Register } from './Pages';
import { ApolloProvider } from '@apollo/client';
import client from './config';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <div id="background" style={{minHeight: '100vh'}}>
            <Switch>
              <Route exact path="/" component={Home}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/register" component={Register}/>
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
