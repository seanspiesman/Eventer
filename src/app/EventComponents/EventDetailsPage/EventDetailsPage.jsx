import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventDetailHeader from "./EventDetailHeader";
import EventDetailInfo from "./EventDetailInfo";
import EventDetailChat from "./EventDetailChat";
import EventDetailSidebar from "./EventDetailSidebar";
import { objectToArray, createDataTree } from "../../common/util/helpers";
import { withFirestore, firebaseConnect, isEmpty } from "react-redux-firebase";
import {
  goingToEvent,
  cancelGoingToEvent,
} from "../../userActions/userActions";
import { addEventComment } from "../eventActions";
import LoadingComponents from "../../LoadingComponents";
import { compose } from "redux";

import { openModal } from "../../Modals/modalActions";
import NotFound from "../../NotFound";
const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {};
  if (
    state.firestore.ordered.events &&
    state.firestore.ordered.events.length > 0
  ) {
    event = state.firestore.ordered.events.filter(
      (event) => event.id === eventId || {}
    )[0];
  }
  return {
    event,
    requesting: state.firestore.status.requesting,
    loading: state.async.loading,
    auth: state.firebase.auth,
    eventChat:
      !isEmpty(state.firebase.data.event_chat) &&
      objectToArray(state.firebase.data.event_chat[ownProps.match.params.id]),
  };
};

const actions = {
  goingToEvent,
  cancelGoingToEvent,
  addEventComment,
  openModal,
};

class EventDetailsPage extends Component {
  async componentDidMount() {
    const { firestore, match } = this.props;
    await firestore.setListener(`events/${match.params.id}`);
  }

  async componentWillUnmount() {
    const { firestore, match } = this.props;
    await firestore.unsetListener(`events/${match.params.id}`);
  }

  render() {
    const {
      event,
      auth,
      loading,
      goingToEvent,
      cancelGoingToEvent,
      addEventComment,
      eventChat,
      openModal,
      requesting,
      match,
    } = this.props;
    const attendees =
      event &&
      event.attendees &&
      objectToArray(event.attendees).sort((a, b) => {
        return a.joinDate.toDate() - b.joinDate.toDate();
      });
    var isHost = false;
    if (event && event.hostUid !== undefined) {
      isHost = event.hostUid === auth.uid;
    }
    const isGoing = attendees && attendees.some((a) => a.id === auth.uid);
    const chatTree = !isEmpty(eventChat) && createDataTree(eventChat);
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const loadingEvent = requesting[`events/${match.params.id}`];

    if (loadingEvent) {
      return <LoadingComponents />;
    }
    if (Object.keys(event).length === 0) {
      return <NotFound />;
    }
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventDetailHeader
            authenticated={authenticated}
            event={event}
            isGoing={isGoing}
            isHost={isHost}
            goingToEvent={goingToEvent}
            cancelGoingToEvent={cancelGoingToEvent}
            loading={loading}
            openModal={openModal}
          />
          <EventDetailInfo event={event} />
          {authenticated && (
            <EventDetailChat
              addEventComment={addEventComment}
              eventId={event.id}
              eventChat={chatTree}
            />
          )}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventDetailSidebar attendees={attendees} />
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  withFirestore,
  connect(mapState, actions),
  firebaseConnect((props) => [`event_chat/${props.match.params.id}`])
)(EventDetailsPage);
