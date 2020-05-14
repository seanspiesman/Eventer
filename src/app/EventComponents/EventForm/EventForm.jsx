import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import cuid from "cuid";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  console.log(state);
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: "",
  };
  if (eventId && state.events.length > 0) {
    event = state.events.filter((event) => event.id === eventId)[0];
  }
  return { event };
};

const actions = {
  createEvent,
  updateEvent,
};

class EventForm extends Component {
  state = { ...this.props.event };

  componentDidMount = () => {
    if (this.props.selectedEvent !== null) {
      this.setState({ ...this.props.selectedEvent });
    }
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    if (this.state.id) {
      this.props.updateEvent(this.state);
      this.props.history.push(`/events/${this.state.id}`);
    } else {
      const newEvent = {
        ...this.state,
        id: cuid(),
        hostPhotoUrl: "/assets/user.png",
      };
      this.props.createEvent(newEvent);
      this.props.history.push(`/events`);
    }
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    // const { cancelForm } = this.props;
    return (
      <Segment>
        <Form onSubmit={this.handleFormSubmit} autoComplete="off">
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              value={this.state.title}
              onChange={this.handleInputChange}
              placeholder="Title"
            />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              type="date"
              value={this.state.date}
              onChange={this.handleInputChange}
              placeholder="Event Date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              value={this.state.city}
              onChange={this.handleInputChange}
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              value={this.state.venue}
              onChange={this.handleInputChange}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              value={this.state.hostedBy}
              onChange={this.handleInputChange}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button type="button" onClick={this.props.history.goBack}>
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState, actions)(EventForm);
