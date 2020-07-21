import React from "react";
import { Grid, Segment, Header, Card, Image, Tab } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { format } from "date-fns/esm";

const panes = [
  { menuItem: "All Events", pane: { key: "allEvents" } },
  { menuItem: "Past Events", pane: { key: "pastEvents" } },
  { menuItem: "Upcoming Events", pane: { key: "futureEvents" } },
  { menuItem: "Hosting", pane: { key: "hosted" } },
];

const UserDetailEvents = ({ changeTab, events, eventsLoading }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached loading={eventsLoading}>
        <Header icon="calendar" content="Events" />
        <Tab
          onTabChange={(e, data) => changeTab(e, data)}
          panes={panes}
          menu={{ secondary: true, pointing: true }}
        />
        <br />
        <Card.Group itemsPerRow={5}>
          {events &&
            events.map((event) => {
              return (
                <Card as={Link} to={`/events/${event.id}`} key={event.id}>
                  <Image src={`/assets/categoryImages/${event.category}.jpg`} />
                  <Card.Content>
                    <Card.Header textAlign="center">{event.title}</Card.Header>
                    <Card.Meta textAlign="center">
                      <div>
                        {event.date && format(event.date.toDate(), "do LLL y")}
                      </div>
                      <div>
                        {event.date && format(event.date.toDate(), "h:mm a")}
                      </div>
                    </Card.Meta>
                  </Card.Content>
                </Card>
              );
            })}
        </Card.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailEvents;
