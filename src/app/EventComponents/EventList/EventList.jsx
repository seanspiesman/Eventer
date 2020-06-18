import React, { Component, Fragment } from "react";
import EventListItem from "./EventListItem";

export default class EventList extends Component {
  render() {
    const {events, deleteEvent} = this.props
    return (
      <Fragment>
        {events && events.map((event) => {
          return (
            <EventListItem
              key={event.id}
              event={event}
              // selectEvent={this.props.selectEvent}
              deleteEvent={deleteEvent}
            />
          );
        })}
      </Fragment>
    );
  }
}
