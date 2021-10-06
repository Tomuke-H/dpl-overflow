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
import User from './components/User';
import Tags from './pages/Tags';
import Answers from './pages/Answers';
import NewAnswer from './pages/NewAnswer';
import EditAnswer from './pages/EditAnswer';
import Answer from './pages/Answer';
import QuestionTestPage from './pages/QuestionTestPage';
import Questions from './pages/Questions';
import Comments from './components/CommentComponents/Comments';
import NewCommentForm from './components/CommentComponents/NewCommentForm';

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
            <ProtectedRoute exact path='/user' component={User}/>
            <Route exact path='/questions' component={Questions}/>
            <Route exact path='/question/:id' component={QuestionTestPage}/>

            {/* probably don't keep this path as the comment component with be embedded in other components but for testing purposes here it is */}
            <Route exact path='/comments' component={Comments}/>
            <Route exact path='/newcomment' component={NewCommentForm}/>
            {/* probably don't keep this path as the comment component with be embedded in other components but for testing purposes here it is */}

            <ProtectedRoute exact path='/edit_user' component={EditUser}/>
            <Route component={()=><p>react 404 path not found</p>} />
          </Switch>
      </FetchUser>
    </>
  );
}

export default App;
