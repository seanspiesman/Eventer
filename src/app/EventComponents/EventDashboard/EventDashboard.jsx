import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";
import { createEvent, deleteEvent, updateEvent } from "../eventActions";

const mapState = (state) => ({
  events: state.events,
});

const actions = {
  createEvent,
  deleteEvent,
  updateEvent,
};

class EventDashboard extends Component {
  state = {
    show: false,
    selectedEvent: null,
  };

  handleFormToggle = () => {
    if (this.state.show === false) {
      this.setState({ show: true, selectedEvent: null });
    } else {
      this.setState({ show: false });
    }
  };

  handleFormOpen = () => {
    this.setState({ show: true, selectedEvent: null });
  };

  handleFormCancel = () => {
    this.setState({ show: false });
  };

  handleCreateEvent = (newEvent) => {
    newEvent.id = cuid();
    newEvent.hostPhotoUrl = "/assets/user.png";
    this.props.createEvent(newEvent);
    this.setState({
      // events: [...this.state.events, newEvent],
      show: false,
    });
  };

  handleSelectEvent = (event) => {
    this.setState({ selectedEvent: event, show: true });
  };

  handleUpdateEvent = (updatedEvent) => {
    this.props.updateEvent(updatedEvent);
    this.setState((events) => ({
      // events: this.state.events.map((event) => {
      //   if (event.id === updatedEvent.id) {
      //     return { ...updatedEvent };
      //   } else {
      //     return event;
      //   }
      // }),
      show: false,
      selectedEvent: null,
    }));
  };

  handleDeleteEvent = (id) => {
    this.props.deleteEvent(id);
    // this.setState(({ events }) => ({
    //   events: events.filter((e) => e.id !== id),
    // }));
  };

  render() {
    const { events } = this.props;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={this.handleSelectEvent}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handleFormOpen}
            positive
            content="Create Event"
          />
          {this.state.show && (
            <EventForm
              updateEvent={this.handleUpdateEvent}
              key={this.state.selectedEvent ? this.state.selectedEvent.id : 0}
              selectedEvent={this.state.selectedEvent}
              createEvent={this.handleCreateEvent}
              cancelForm={this.handleFormCancel}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default connect(mapState, actions)(EventDashboard);
