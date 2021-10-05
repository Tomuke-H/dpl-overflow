import './App.css';
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import FetchUser from './components/FetchUser';
import EditUser from './components/EditUser';
import OurNavbar from './components/OurNavbar';
import TestPage from './pages/TestPage';
import Tags from './pages/Tags';

function App() {
  return (
    <>
      <OurNavbar />
      <FetchUser>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/test_page' component={TestPage}/>
            <Route exact path='/tags' component={Tags}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <ProtectedRoute exact path='/edit_user' component={EditUser}/>
            <Route component={()=><p>react 404 path not found</p>} />
          </Switch>
      </FetchUser>
    </>
  );
}

export default App;
