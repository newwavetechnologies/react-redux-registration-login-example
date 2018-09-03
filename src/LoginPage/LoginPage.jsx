import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";

import { Navbar, Nav, NavItem, Button, Glyphicon } from "react-bootstrap";

import { Component } from "react";
import logo from "../newwave.png";
import styles from "../style.css";
import person from "../Vector.png";
import {Footer} from 'react-materialize';
import newwave from "../newwaveLogo.png";
import { Container, Row, Col } from "reactstrap";

const wellStyles = { maxWidth: 400, margin: "0 auto 10px" };
const loginWellStyles = { maxWidth: 500, margin: "0 auto 10px" };
const logoStyles = { maxHeight: 400 };

class LoginPage extends React.Component {
  constructor(props) {
    super(props);

    // reset login status
    this.props.dispatch(userActions.logout());

    this.state = {
      email: "",
      password: "",
      submitted: false,
      isVisible: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  /*   updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  } */

  handleSubmit(e) {
    e.preventDefault();

    this.setState({ submitted: true });
    const { email, password } = this.state;
    const { dispatch } = this.props;
    if (email && password) {
      dispatch(userActions.login(email, password));
    }
  }

  render() {
    const { loggingIn } = this.props;
    const { email, password, submitted } = this.state;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 ">
          <div style={logoStyles}  >
        <img  className="img-responsive"  alt="" src={logo} /> 
          <div  className="carousel-caption">
                <h4 className="text-center">Powered By</h4>
              {/*   <h1 className="text-center ">newwave</h1> */}
                <img style={{height:'50px'}} alt="" src={newwave} />
              </div> 

              </div>
          </div>
          <div className="col-md-9">
       
           {/*  <div className="row">
             
              <div className="col-md-offset-11">
                <img
                  className="img-responsive  img-circle"
                  style={{ backgroundColor: "#335DFF", float: "right" }}
                  alt=""
                  src={person}
                />
              </div>
            </div> */}
            <div className="row">
              <h2 className="text-center text-primary" >myCareAi</h2>
              <h4 className="text-center">Admin Portal</h4>
              <br></br>
              <br></br>
              <form name="form" onSubmit={this.handleSubmit }>
                <div
                  className={
                    "form-group" + (submitted && !email ? " has-error" : "")
                  }  style={loginWellStyles}
                >
                  <label htmlFor="email">Email</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <span className="glyphicon glyphicon-envelope" />
                    </div>
                    <input
                      type="text"
                      className="form-control "
                      name="email"
                      value={email}
                      onChange={this.handleChange}
                    />
                  </div>

                  {submitted &&
                    !email && (
                      <div className="help-block">Email is required</div>
                    )}
                </div>
                <br></br>
                <br></br>
                <div
                  className={
                    "form-group" + (submitted && !password ? " has-error" : "")
                  } style={loginWellStyles}
                >
                  <label htmlFor="password">Password</label>
                  <div className="input-group">
                    <div className="input-group-addon">
                      <span className="glyphicon glyphicon-lock" />
                    </div>

                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={this.handleChange}
                    />
                  </div>

                  {submitted &&
                    !password && (
                      <div className="help-block">Password is required</div>
                    )}
                </div>
                <br></br>
                <br></br>
                <div className="form-group" style={wellStyles}>
                  <button className={"btn btn-primary btn-lg btn-block"}>
                    Login
                  </button>
                  {loggingIn && (
                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                  )}
                  {/*   <Link to="/register" className="btn btn-link">
              Register
            </Link> */}
                </div>
              </form>
            </div>

              
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.authentication;
  return {
    loggingIn
  };
}

const connectedLoginPage = connect(mapStateToProps)(LoginPage);
export { connectedLoginPage as LoginPage };
