import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";

export const EventDetailSidebar = ({ attendees }) => {
  const isHost = false;
  return (
    <Fragment>
      <Segment
        textAlign="center"
        style={{ border: "none" }}
        attached="top"
        secondary
        inverted
        color="teal"
      >
        {attendees && attendees.length}{" "}
        {attendees && attendees.length === 1 ? "Person" : "People"} Going
      </Segment>
      <Segment attached>
        <Item.Group relaxed divided>
          {attendees &&
            attendees.map((attendee) => {
              return (
                <Item key={attendee.id} style={{ position: "relative" }}>
                  {isHost && (
                    <Label
                      style={{ position: "absolute" }}
                      color="orange"
                      ribbon="right"
                    >
                      Host
                    </Label>
                  )}
                  <Item.Image size="tiny" src={attendee.photoURL} />
                  <Item.Content verticalAlign="middle">
                    <Item.Header as="h3">
                      <div>{attendee.name}</div>
                    </Item.Header>
                  </Item.Content>
                </Item>
              );
            })}
        </Item.Group>
      </Segment>
    </Fragment>
  );
};

export default EventDetailSidebar;
