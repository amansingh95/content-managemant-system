
import React, { Fragment , useEffect} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import './App.css';
import Landing from './components/layout/Landing.js';
import Navbar from './components/layout/Navbar';
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import AddExperience from "./components/profile-form/AddExperience";
import AddEducation from "./components/profile-form/AddEducation";
import Createprofile from "./components/profile-form/CreateProfile";
import Editprofile from "./components/profile-form/EditProfile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
// Redux
import { Provider } from "react-redux";
import  store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import  PrivateRoute  from "./components/routing/PrivateRoute";
import { addEducation } from './actions/profile';

if(localStorage.token){
    setAuthToken(localStorage.token);
}
const App=()=>{
    useEffect(()=>{ 
        store.dispatch(loadUser());
    },[]);
    return(
    <Provider store={store}>
    <Router>
        <Fragment>
        <Navbar/>
        <Route exact path='/' component={Landing}/>
        <section className="container">
            <Alert />
            <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/profiles" component={Profiles} />
                <Route exact path="/profile/:id" component={Profile} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/create-profile" component={Createprofile} />
                <PrivateRoute exact path="/edit-profile" component={Editprofile} />
                <PrivateRoute exact path="/add-experience" component={AddExperience} />
                <PrivateRoute exact path="/add-education" component={AddEducation} />
                <PrivateRoute exact path="/posts" component={Posts} />
                <PrivateRoute exact path="/post/:id" component={Post} />
            </Switch>
        </section>
        </Fragment>
    </Router>
    </Provider>
)};
export default App; 
