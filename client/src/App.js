import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import { Container } from 'semantic-ui-react';
import { Route, Switch } from 'react-router';
import Home from './components/Home';
import Things from './components/Things';

function App() {
  return (
    <>
      <Navbar />
      <Container>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route exact path='/things' component={Things}/>
          <Route component={()=><p>react 404 path not found</p>} />
        </Switch>
      </Container>
    </>
  );
}

export default App;
