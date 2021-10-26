import './App.css';
import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import FetchUser from './components/UserComponents/FetchUser';
import EditUser from './components/UserComponents/EditUser';
import OurNavbar from './components/OurNavbar';
import TestPage from './pages/TestPage';
import User from './components/UserComponents/User';
import Answers from './components/AnswerComponents/Answers';
import EditAnswer from './components/AnswerComponents/EditAnswer';
import Answer from './components/AnswerComponents/Answer'
import QuestionPage from './pages/QuestionPage';
import Dashboard from './pages/Dashboard';
import NewQuestionPage from './pages/NewQuestionPage';
import Leaderboard from './pages/Leaderboard';
import Yearbook from './pages/Yearbook';
import useGetUser from './hooks/useGetUser';
import TagsPage from './pages/TagsPage';
import Footer from './components/Footer';
import OtherUserProfile from './components/UserComponents/OtherUserProfile';
import AboutUs from './pages/AboutUs';
import WebFont from 'webfontloader';
import { useEffect } from 'react';
import Background from './icons/DevPointOverflow_LogoOnly_3x.png'

function App() {
  const { users } = useGetUser()

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Lato']
      }
    })
  }, [])

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
      <ProtectedRoute exact path={`users/${user.id}/profile`} render={(props)=> <OtherUserProfile {...props} user={user} />} />
      )
    })
  }

  const hasNavBar = () =>{
    return(
      <div>
        <OurNavbar /> 
        <div style={{height: '80px'}}></div>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/test_page' component={TestPage}/>
            <ProtectedRoute exact path='/tags' component={TagsPage}/>
            <ProtectedRoute exact path='/about' component={AboutUs}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/register' component={Register}/> 
            <ProtectedRoute exact path='/answers' component={Answers}/>
            <ProtectedRoute exact path='/answers/:id' component={Answer}/>
            <ProtectedRoute exact path='/answers/:id/edit' component={EditAnswer}/>
      
            <ProtectedRoute exact path='/dashboard' component={Dashboard}/>
            <ProtectedRoute exact path='/leaderboard' component={Leaderboard}/>
            <ProtectedRoute exact path='/new_question' component={NewQuestionPage}/>
            <Route exact path='/question/:id' component={QuestionPage}/>

            <ProtectedRoute exact path='/yearbook' component={Yearbook}/>
            <ProtectedRoute exact path='/user/edit' component={EditUser}/>
            <ProtectedRoute exact path='/users/:id/profile' component={OtherUserProfile}/>
            {renderRoutes()}
            {renderProfiles()}
            <Route component={()=><p>react 404 path not found</p>} />
        </Switch>
        <div style={{height: "80px"}}></div>
        <Footer />
    </div>
    )
  }
  return (
    <div style={styles.everything}>
      <FetchUser>
        <Switch>
          {/* Currently Commented out so that navbar appears on the login and register pages */}
          {/* <Route exact path='/login' component={Login}/>
          <Route exact path='/register' component={Register}/> */}
          
          <Route component = {hasNavBar}/>
        </Switch>
      </FetchUser>
    </div>
  )
}

const styles = {
  everything: {
    fontFamily: 'Lato',
    backgroundColor: '#FFFCF9',
  }
}

export default App;
