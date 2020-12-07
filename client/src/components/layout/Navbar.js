import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loadUser, logout } from "../../actions/auth";

const Navbar =({auth:{isAuthenticated ,loading}, logout})=>{
    const authLink=(
        <ul>
              <li> 
            <Link to="/profiles">Developers</Link> 
        </li>
        <li> 
            <Link to="/posts">posts</Link> 
        </li>
             <li>
                <i className="fas fa-user"></i>{' '}
                <Link to="/dashboard"><span className="hid-sm">Dashboard</span></Link> 
             </li>
            <li>
                <a onClick={logout} href="#!">
                <i className="fas fa-sign-out-all"></i>{' '}
                <span className="hid-sm">Logout</span></a>
            </li>
        </ul>
    );
    const gustLinks=(
    <ul>
        <li>
            <Link to="/profiles">Developers</Link> 
        </li>
        <li>
            <Link to="/register">Register</Link> 
        </li>
        <li>
            <Link to="/login">Login</Link> 
        </li>
    </ul>
    );
    return(
            <nav className="navbar bg-dark">
                <h1>
                    <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
                </h1>
    {!loading && (<Fragment>{isAuthenticated ? authLink: gustLinks}</Fragment>)}
            </nav>
       
    );
};
Navbar.propTypes={
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired
};

const mapStateToProps =state=>({
    auth:state.auth
});
export default connect(mapStateToProps,
    {logout})(Navbar);