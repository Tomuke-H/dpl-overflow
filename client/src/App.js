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
import Answers from './pages/Answers';
import NewAnswer from './pages/NewAnswer';
import EditAnswer from './pages/EditAnswer';
import Answer from './pages/Answer';

function App() {
  return (
    <>
      <OurNavbar />
      <FetchUser>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/test_page' component={TestPage}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/>
            <Route exact path='/answer/:id' component={Answer}/>
            <Route exact path='/answers' component={Answers}/>
            <Route exact path='/answers/new' component={NewAnswer}/>
            <Route exact path='/answers/edit' component={EditAnswer}/>
            <ProtectedRoute exact path='/edit_user' component={EditUser}/>
            <Route component={()=><p>react 404 path not found</p>} />
          </Switch>
      </FetchUser>
    </>
  );
}

export default App;
