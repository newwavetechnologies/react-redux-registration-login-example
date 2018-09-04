import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import logo from "../Images/newwave.png";
import { userActions } from "../_actions";
import styles from "../style.css";
import viewUser from "../Images/Viewuser.png";
import logOut from "../Images/logout.png";
import addUser from "../Images/AddUser.png";
import home from "../Images/home.png";
import registrationSuccess from "../Images/registration.png";
import newwave from "../Images/newwaveLogo.png";
const centerStyles = { maxWidth: 400, margin: "0 auto 0" };
import header from "../Images/header.png";
import footer from "../Images/footer.png";
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


  removeRegisteredUser() {
    localStorage.removeItem("registeredUser");
  }

  render() {
    //const { loggedInUser, loading,  error } = this.state;
    //let  loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    let loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    let registeredUser = JSON.parse(localStorage.getItem("registeredUser"));
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-6 col-md-3">
            <h4 className="text-center">Powered By</h4>
            <div className="text-center">
              <img className={styles.logoHeight} alt="" src={newwave} />{" "}
            </div>
          </div>
          <div className="col-6 col-md-8">
            <h2 className="text-center text-primary">myCareAi</h2>
            <h4 className="text-center">Admin Portal</h4>
          </div>
          <div className="col-6  col-md-1">
            <img className={styles.headerHeight} alt="" src={header} />
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
                  <span>Home </span>{" "}
                </div>
              </div>{" "}
            </Link>

            <Link to="/register" onClick={this.removeRegisteredUser}>
              <div className={styles.iconsHeight}>
                {" "}
                <img className={styles.imageSize} alt="" src={addUser} />
                <br />
                <span> Add Users </span>{" "}
              </div>
            </Link>
            <Link to="/viewUsers" onClick={this.removeRegisteredUser}>
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
            {!registeredUser && (
              <div style={centerStyles}>
                <h4 className="text-center text-primary">
                  Welcome to MiHIN admin portal
                </h4>
                <h4 className="text-center text-primary">
                  Please choose one of the option from left menu
                </h4>
              </div>
            )}
            {registeredUser && (
              <div style={centerStyles}>
                <img
                  className={styles.regSuccessImageSize}
                  alt=""
                  src={registrationSuccess}
                />
                <h4 className="text-center text-primary">
                  Account Creation was successfull
                </h4>
                <h4 className="text-center text-primary">
                  Your Registration code is {registeredUser.regCode}
                </h4>
              </div>
            )}
          </div>

          <div className={styles.sticky}>
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
          </div>
        </div>
        <div>
          {" "}
          <img className={styles.footerHeight} alt="" src={footer} />
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
