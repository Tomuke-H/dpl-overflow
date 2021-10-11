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
import Answers from './components/AnswerComponents/Answers';
import EditAnswer from './components/AnswerComponents/EditAnswer';
import Answer from './components/AnswerComponents/Answer'
import Comments from './components/CommentComponents/Comments';
import NewCommentForm from './components/CommentComponents/NewCommentForm';
import QuestionPage from './pages/QuestionPage';
import Dashboard from './pages/Dashboard';
import NewQuestionPage from './pages/NewQuestionPage';
import Yearbook from './pages/Yearbook';
import TagsPage from './pages/TagsPage';

function App() {

  const hasNavBar = () =>{
    return(
      <>
        <OurNavbar /> 
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/test_page' component={TestPage}/>
            <Route exact path='/tags' component={TagsPage}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/> 
            <ProtectedRoute exact path='/user' component={User}/>
            <Route exact path='/answers' component={Answers}/>
            <Route exact path='/answers/:id' component={Answer}/>
            <Route exact path='/answers/:id/edit' component={EditAnswer}/>

            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/new_question' component={NewQuestionPage}/>
            <Route exact path='/question/:id' component={QuestionPage}/>

            <Route exact path='/yearbook' component={Yearbook}/>
            <Route exact path='/users/:id' component={User}/>

            <ProtectedRoute exact path='/user/edit' component={EditUser}/>
            <Route component={()=><p>react 404 path not found</p>} />
        </Switch>
    </>
    )
  }
  return (
    <>
    <FetchUser>
      <Switch>
        {/* Currently Commented out so that navbar appears on the login and register pages */}
        {/* <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/> */}
        
        <Route component = {hasNavBar}/>
      </Switch>
    </FetchUser>
    </>
  )
}

export default App;
