import React, { Fragment } from "react";
import EventDashboard from "./EventComponents/EventDashboard/EventDashboard";
import NavBar from "./NavBar/NavBar";
import { Container } from "semantic-ui-react";
import { Route } from "react-router-dom";
import { HomePage } from "./HomePage/HomePage";
import { EventDetailsPage } from "./EventComponents/EventDetailsPage/EventDetailsPage";
import { PeopleDashboard } from "./UserComponents/UserDashboard/PeopleDashboard";
import { SettingsDashboard } from "./UserComponents/Settings/SettingsDashboard";
import { UserDetailsPage } from "./UserComponents/UserDetails/UserDetailsPage";
import EventForm from "./EventComponents/EventForm/EventForm";

class App extends React.Component {
  render() {
    return (
      <Fragment>
        <Route exact path="/" component={HomePage} />
        <Route
          path="/(.+)"
          render={() => (
            <Fragment>
              <NavBar />
              <Container className="main">
                <Route path="/events" component={EventDashboard} />
                <Route path="/events/:id" component={EventDetailsPage} />
                <Route path="/people" component={PeopleDashboard} />
                <Route path="/profile/:id" component={UserDetailsPage} />
                <Route path="/settings" component={SettingsDashboard} />
                <Route path="/createEvent" component={EventForm} />
              </Container>
            </Fragment>
          )}
        />
      </Fragment>
    );
  }
}

export default App;
