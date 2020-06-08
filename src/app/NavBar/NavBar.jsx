import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { SignedOut } from "./Menus/SignedOut";
import { SignedIn } from "./Menus/SignedIn";
import { openModal } from "../Modals/modalActions";
import { logout } from "../auth/authActions";

const actions = { openModal, logout };

const mapState = (state) => ({
  auth: state.auth,
});

class NavBar extends Component {
  handleSignIn = () => {
    this.props.openModal("LoginModal");
  };

  handleRegister = () => {
    this.props.openModal("RegisterModal");
  };

  handleSignOut = () => {
    this.props.logout();
    this.props.history.push("/");
  };

  render() {
    const { auth } = this.props;
    const authenticated = auth.authenticated;
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item as={NavLink} exact to="/" header>
              <img src="/assets/logo.png" alt="logo" />
              Eventer
            </Menu.Item>
            <Menu.Item as={NavLink} exact to="/events" name="Events" />
            {authenticated && (
              <Fragment>
                <Menu.Item as={NavLink} to="/people" name="people" />
                <Menu.Item as={NavLink} to="/test" name="Test" />

                <Menu.Item>
                  <Button
                    as={Link}
                    to="/createEvent"
                    floated="right"
                    positive
                    inverted
                    content="Create Event"
                  />
                </Menu.Item>
              </Fragment>
            )}
            {authenticated ? (
              <SignedIn
                signOut={this.handleSignOut}
                currentUser={auth.currentUser}
              />
            ) : (
              <SignedOut
                signIn={this.handleSignIn}
                register={this.handleRegister}
              />
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(connect(mapState, actions)(NavBar));
