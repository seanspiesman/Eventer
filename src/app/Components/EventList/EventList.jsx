import React, { Component, Fragment } from "react";
import EventListItem from "./EventListItem";

export default class EventList extends Component {
  render() {
    return (
      <Fragment>
        {this.props.events.map((event) => {
          return (
            <EventListItem
              key={event.id}
              event={event}
              selectEvent={this.props.selectEvent}
              deleteEvent={this.props.deleteEvent}
            />
          );
        })}
      </Fragment>
    );
  }
}
