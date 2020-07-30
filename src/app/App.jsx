import React, { Fragment } from "react";
import EventDashboard from "./EventComponents/EventDashboard/EventDashboard";
import NavBar from "./NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route, Switch, withRouter } from "react-router-dom";
import { HomePage } from "./HomePage/HomePage";
import EventDetailsPage from "./EventComponents/EventDetailsPage/EventDetailsPage";
import PeopleDashboard from "./UserComponents/UserDashboard/PeopleDashboard";
import SettingsDashboard from "./UserComponents/Settings/SettingsDashboard";
import UserDetailsPage from "./UserComponents/UserDetails/UserDetailsPage";
import EventForm from "./EventComponents/EventForm/EventForm";
import TestComponent from "../testarea/TestComponent";
import ModalManager from "./Modals/ModalManager";
import { UserIsAuthneticated } from "./auth/authWrapper";
import NotFound from "./NotFound";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <ModalManager />
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main">
                <Switch key={this.props.location.key}>
                  <Route exact path="/events" component={EventDashboard} />
                  <Route path="/events/:id" component={EventDetailsPage} />
                  <Route
                    path="/people"
                    component={UserIsAuthneticated(PeopleDashboard)}
                  />
                  <Route
                    path="/profile/:id"
                    component={UserIsAuthneticated(UserDetailsPage)}
                  />
                  <Route
                    path="/settings"
                    component={UserIsAuthneticated(SettingsDashboard)}
                  />
                  <Route
                    path={["/createEvent", "/manage/:id"]}
                    component={UserIsAuthneticated(EventForm)}
                  />
                  <Route path="/test" component={TestComponent} />
                  <Route component={NotFound} />
                </Switch>
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default withRouter(App);
