import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../newwave.png";
import { userActions } from "../_actions";
import { userConstants } from "../_constants";
import styles from "../style.css";
import viewUser from "../Viewuser.png";
import logOut from "../logout.png";
import addUser from "../AddUser.png";
import home from "../home.png";
import registrationSuccess from "../registration.png";
import newwave from "../newwaveLogo.png";
const centerStyles = { maxWidth: 400, margin: "0 auto 0" };
class HomePage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedInUser: [],
      loading: true,
      error: null
    };

    this.removeRegisteredUser = this.removeRegisteredUser.bind(this);
    this.getUserData = this.getUserData.bind(this);
  }

  getUserData() {
    setTimeout(() => {
     
      let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
      if (loggedInUser) {
        this.setState({
          loggedInUser: loggedInUser,
          loading: false,
          error: null
        });
      }
    }, 1000);
  }

  componentDidMount() {
    this.getUserData();

    // this.props.dispatch(userActions.getUser());
  }

  handleDeleteUser(id) {
    return e => this.props.dispatch(userActions.delete(id));
  }
  removeRegisteredUser() {
    localStorage.removeItem("registeredUser");
  }

  render() {
    //const { loggedInUser, loading,  error } = this.state;
    //let  loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let showRegisterCode, showLoggedInUser;
    let registeredUser = JSON.parse(localStorage.getItem("registeredUser"));

    if (registeredUser) {
      showRegisterCode = (
        <h1>Your Registration code is {registeredUser.regCode}</h1>
      );
    } else {
      showRegisterCode = <h1>Welecome</h1>;
    }

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 col-md-3">
            <h4 className="text-center">Powered By</h4>
            <div className="text-center"><img className={styles.logoHeight}alt="" src={newwave} /> </div>
           {/*  <h1 className="text-center text-primary">newwave</h1> */}
          
          </div>
          <div className="col-6 col-md-9">
            <h2 className="text-center text-primary">myCareAi</h2>
            <h4 className="text-center">Admin Portal</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-6 col-md-3">
            <Link to="/">
              {" "}
              <div className="bg-primary">
                <div className={styles.iconsHeight}>
                  {" "}
                  <img className={styles.imageSize} alt="" src={home} />
                  <br />
                  <lable>Home </lable>{" "}
                </div>
              </div>{" "}
            </Link>

            <Link to="/register" onClick={this.removeRegisteredUser}>
              <div className={styles.iconsHeight}>
                {" "}
                <img className={styles.imageSize} alt="" src={addUser} />
                <br />
                <lable> Add Users </lable>{" "}
              </div>
            </Link>
            <Link to="/viewUsers">
              {" "}
              <div className={styles.iconsHeight}>
                {" "}
                <img className={styles.imageSize} alt="" src={viewUser} />
                <br />
                <lable> View Users </lable>{" "}
              </div>
            </Link>
            <Link to="/login">
              {" "}
              <div className={styles.iconsHeight}>
                {" "}
                <img className={styles.imageSize} alt="" src={logOut} />
                <br />
                <lable> Log Out</lable>{" "}
              </div>
            </Link>
          </div>
          <div className="col-6 col-md-9">
          {!registeredUser && (<div style={centerStyles}>
          <h4 className="text-center text-primary">Welcome to MiHIN admin portal</h4>
<h4 className="text-center text-primary">Please choose one of the option from left menu</h4>
          </div>
            )}
            {registeredUser && ( <div style={centerStyles}>
             
             <img
               className={styles.regSuccessImageSize}
               alt=""
               src={registrationSuccess}
             />
<h4 className="text-center text-primary">Account Creation was successfull</h4>
<h4 className="text-center text-primary">Your Registration code is {registeredUser.regCode}</h4>
           </div>
            
            )}

            
          </div>
          <div className={styles.sticky}>
            <h1>
              {" "}
              <span className="label label-primary">
                {loggedInUser && (
                  <lable>
                    {loggedInUser.firstName + " " + loggedInUser.lastName}
                  </lable>
                )}
              </span>
            </h1>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggedInUser, authentication } = state;
  const { user } = authentication;
  return {
    user,
    loggedInUser
  };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
