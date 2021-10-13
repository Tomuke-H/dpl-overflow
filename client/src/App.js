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
import Leaderboard from './pages/Leaderboard';
import Yearbook from './pages/Yearbook';
import useGetUser from './hooks/useGetUser';
import TagsPage from './pages/TagsPage';
import UserProfile from './components/UserProfile';
import Footer from './components/Footer';

function App() {

  const { users } = useGetUser()

  const renderRoutes = () => {
    return users.map((user)=>{
      return(
      <ProtectedRoute exact path={`/user/${user.id}`} render={(props)=> <User {...props} user={user}/>}/>
      )
    })
  }

  const renderProfiles = () => {
    return users.map((user) => {
      return (
      <ProtectedRoute exact path={`users/${user.id}`} render={(props)=> <UserProfile {...props} user={user} />} />
      )
    })
  }

  const hasNavBar = () =>{
    return(
      <>
        <OurNavbar /> 
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/test_page' component={TestPage}/>
            <ProtectedRoute exact path='/tags' component={TagsPage}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/> 
            {/* <ProtectedRoute exact path='/user' component={UserProfile}/> */}
            <ProtectedRoute exact path='/answers' component={Answers}/>
            <ProtectedRoute exact path='/answers/:id' component={Answer}/>
            <ProtectedRoute exact path='/answers/:id/edit' component={EditAnswer}/>
      
            <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
            <ProtectedRoute exact path='/leaderboard' component={Leaderboard}/>
            <ProtectedRoute exact path='/new_question' component={NewQuestionPage}/>
            <Route exact path='/question/:id' component={QuestionPage}/>

            <ProtectedRoute exact path='/yearbook' component={Yearbook}/>
            <ProtectedRoute exact path='/users/:id' component={UserProfile}/>
            {renderRoutes()}
            {renderProfiles()}
            <ProtectedRoute exact path='/user/edit' component={EditUser}/>
            <Route component={()=><p>react 404 path not found</p>} />
        </Switch>
        <br />
        <br />
        <Footer />
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
