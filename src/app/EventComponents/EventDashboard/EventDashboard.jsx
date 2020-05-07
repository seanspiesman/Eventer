import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import EventForm from "../EventForm/EventForm";
import cuid from "cuid";

const eventsFromDashboard = [
  {
    id: "1",
    title: "Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
    ],
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg",
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg",
      },
    ],
  },
];

export default class EventDashboard extends Component {
  state = {
    events: eventsFromDashboard,
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
    this.setState({ events: [...this.state.events, newEvent], show: false });
  };

  handleSelectEvent = (event) => {
    this.setState({ selectedEvent: event, show: true });
  };

  handleUpdateEvent = (updatedEvent) => {
    this.setState((events) => ({
      events: this.state.events.map((event) => {
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent };
        } else {
          return event;
        }
      }),
      show: false,
      selectedEvent: null,
    }));
  };

  handleDeleteEvent = (id) => {
    this.setState(({ events }) => ({
      events: events.filter((e) => e.id !== id),
    }));
  };

  render() {
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={this.state.events}
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
