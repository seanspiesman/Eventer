import React, { Component } from "react";
import { Segment, Item, Icon, List, Button } from "semantic-ui-react";
import EventListAttendance from "./EventListAttendance";
import { Link } from "react-router-dom";
import { format } from "date-fns";

export default class EventListItem extends Component {
  render() {
    const { event } = this.props;
    return (
      <Segment.Group>
        <Segment>
          <Item.Group>
            <Item>
              <Item.Image size="tiny" circular src={event.hostPhotoURL} />
              <Item.Content>
                <Item.Header>{event.title}</Item.Header>
                <Item.Description>Hosted by {event.hostedBy}</Item.Description>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
        <Segment>
          <span>
            <Icon name="clock" /> {format(event.date.toDate(), "EEEE do LLL")}{" "}
            at {format(event.date.toDate(), "h:mm a")} |
            <Icon name="marker" /> {event.venue}
          </span>
        </Segment>
        <Segment secondary>
          <List horizontal>
            {event.attendees &&
              Object.values(event.attendees).map((attendee, index) => {
                // console.log(event.attendees);
                return <EventListAttendance key={index} attendee={attendee} />;
              })}
          </List>
        </Segment>
        <Segment clearing>
          <span>{event.description}</span>
          <Button
            onClick={() => {
              this.props.deleteEvent(event.id);
            }}
            as="a"
            color="red"
            floated="right"
            content="Delete"
          />
          <Button
            // onClick={() => {
            //   this.props.selectEvent(event);
            // }}
            as={Link}
            to={`/events/${event.id}`}
            color="teal"
            floated="right"
            content="View"
          />
        </Segment>
      </Segment.Group>
    );
  }
}
