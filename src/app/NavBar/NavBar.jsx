import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import { SignedOut } from "./Menus/SignedOut";
import { SignedIn } from "./Menus/SignedIn";

class NavBar extends Component {
  state = {
    authenticated: false,
  };

  handleSignIn = () => {
    this.setState({ authenticated: true });
  };
  handleSignOut = () => {
    this.setState({ authenticated: false });
    this.props.history.push("/");
  };

  render() {
    const { authenticated } = this.state;
    return (
      <div>
        <Menu inverted fixed="top">
          <Container>
            <Menu.Item as={NavLink} exact to="/" header>
              <img src="/assets/logo.png" alt="logo" />
              Eventer
            </Menu.Item>
            <Menu.Item as={NavLink} exact to="/events" name="Events" />
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
            {authenticated ? (
              <SignedIn signOut={this.handleSignOut} />
            ) : (
              <SignedOut signIn={this.handleSignIn} />
            )}
          </Container>
        </Menu>
      </div>
    );
  }
}

export default withRouter(NavBar);
