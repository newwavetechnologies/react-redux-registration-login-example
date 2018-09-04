import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import { userActions } from "../_actions";

import ReactPhoneInput from "react-phone-input-2";
import ReactTelInput from "react-telephone-input";
import "react-telephone-input/lib/withStyles";
import flags from "../Images/flags.png";

const teleStyles = require("react-telephone-input/lib/withStyles");

import { formatNumber } from "libphonenumber-js";
import styles from "../style.css";
import person from "../Images/Vector.png";
import viewUser from "../Images/Viewuser.png";
import logOut from "../Images/logout.png";
import addUser from "../Images/AddUser.png";
import home from "../Images/home.png";
import newwave from "../Images/newwaveLogo.png";
const wellStyles = { maxWidth: 400, margin: "0 auto 10px" };
const loginWellStyles = { maxWidth: 500, margin: "0 auto 10px" };
import mihin from "../Images/MiHIN.png";
import header from "../Images/header.png";
import footer from "../Images/footer.png";

class RegisterPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        email: "",
        phone_number: "",
        country_code: "",
        isTemp: true,
        mrnId: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  handleInputChange(telNumber, selectedCountry) {
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        phone_number: formatNumber(telNumber, "National"),
        country_code: selectedCountry.dialCode
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({ submitted: true });
    const { user } = this.state;
    const { dispatch } = this.props;
    if (user.firstName && user.lastName && user.email && user.phone_number) {
      dispatch(userActions.register(user));
    }
  }

  render() {
    const { registering } = this.props;
    const { user, submitted } = this.state;
    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 col-md-3">
          <div className="text-center">
            <h1>
              {" "}
              <span className="label label-primary ">
                {loggedInUser && (
                  <span >
                    {loggedInUser.firstName + " " + loggedInUser.lastName}
                  </span>
                )}
              </span>
            </h1>
          </div>
          </div>
          <div className="col-6 col-md-8">
            <h2 className="text-center text-primary">myCareAI</h2>
            <h4 className="text-center">Create Account</h4>
          </div>
          <div className="col-6  col-md-1">
            <img className={styles.headerHeight} alt="" src={mihin} />
           
            </div>
        </div>

        <div className="row">
          <div className="col-6 col-md-3">
            <Link to="/">
              {" "}
              <div className={styles.iconsHeight}>
                {" "}
                <img className={styles.imageSize} alt="" src={home} />
                <br />
                <span>Home </span>{" "}
              </div>
            </Link>

            <Link to="/register" onClick={this.removeRegisteredUser}>
              <div className="bg-primary">
                <div className={styles.iconsHeight}>
                  {" "}
                  <img className={styles.imageSize} alt="" src={addUser} />
                  <br />
                  <span> Add Users </span>
                </div>{" "}
              </div>
            </Link>
            <Link to="/viewUsers">
              {" "}
              <div className={styles.iconsHeight}>
                {" "}
                <img className={styles.imageSize} alt="" src={viewUser} />
                <br />
                <span> View Users </span>{" "}
              </div>
            </Link>
            <Link to="/login">
              {" "}
              <div className={styles.iconsHeight}>
                {" "}
                <img className={styles.imageSize} alt="" src={logOut} />
                <br />
                <span> Log Out</span>{" "}
              </div>
            </Link>
          </div>
          <div className="col-6 col-md-8">
            <form name="form" onSubmit={this.handleSubmit}>
              <div
                className={
                  "form-group" +
                  (submitted && !user.firstName ? " has-error" : "")
                }
                style={loginWellStyles}
              >
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={user.firstName}
                  onChange={this.handleChange}
                />
                {submitted &&
                  !user.firstName && (
                    <div className="help-block">First Name is required</div>
                  )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !user.lastName ? " has-error" : "")
                }
                style={loginWellStyles}
              >
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastName"
                  value={user.lastName}
                  onChange={this.handleChange}
                />
                {submitted &&
                  !user.lastName && (
                    <div className="help-block">Last Name is required</div>
                  )}
              </div>
              <div
                className={
                  "form-group" + (submitted && !user.email ? " has-error" : "")
                }
                style={loginWellStyles}
              >
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="email"
                  value={user.email}
                  onChange={this.handleChange}
                />
                {submitted &&
                  !user.email && (
                    <div className="help-block">Username is required</div>
                  )}
              </div>
              <div
                className={
                  "form-group" +
                  (submitted && !user.phone_number ? " has-error" : "")
                }
                style={loginWellStyles}
              >
                <label htmlFor="phone_number">Phone Number</label>

                <ReactTelInput
                  name="phone_number" 
                  defaultCountry="us"
                  flagsImagePath={flags}
                  onChange={this.handleInputChange}
                />
                {submitted &&
                  !user.phone_number && (
                    <div className="help-block">Phone Number is required</div>
                  )}
              </div>
              <div
                className={
                  "form-group" 
                }
                style={loginWellStyles}
              >
                <label htmlFor="mrnId">Medical Record Number (MRN) </label>
                <input
                  type="text"
                  className="form-control"
                  name="mrnId"
                  value={user.mrnId}
                  onChange={this.handleChange}
                />

              </div>
              <div className="form-group" style={wellStyles}>
                <button className="btn btn-primary btn-lg btn-block">
                  Create Account
                </button>
                {registering && (
                  <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                )}
                <Link to="/" className="btn btn-link btn-lg btn-block">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        {/*   <div className={styles.sticky}>
            <h1>
              {" "}
              <span className="label label-primary">
                {loggedInUser && (
                  <span>
                    {loggedInUser.firstName + " " + loggedInUser.lastName}
                  </span>
                )}
              </span>
            </h1>
          </div> */}
        </div>
     {/*    <div> <img className={styles.footerHeight} alt="" src={footer} />
              </div> */}

                  <div>
          <div  className={styles.footerWording}>
          <h4 className="text-center" >Powered By</h4>
          </div>
            <div >
              <img className={styles.footerHeight} alt="" src={newwave} />{" "}
            </div>
          
    
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { registering } = state.registration;
  return {
    registering
  };
}

const connectedRegisterPage = connect(mapStateToProps)(RegisterPage);
export { connectedRegisterPage as RegisterPage };
