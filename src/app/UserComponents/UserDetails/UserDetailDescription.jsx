import React from "react";
import { Grid, Segment, Header, List, Item, Icon } from "semantic-ui-react";
import format from "date-fns/format";

const UserDetailDescription = ({ profile }) => {
  let created;
  if (profile.createdAt) {
    created = format(profile.createdAt.toDate(), "MMMM do, Y");
  }
  return (
    <Grid.Column width={12}>
      <Segment>
        <Grid columns={2}>
          <Grid.Column width={10}>
            <Header icon="smile" content={`About ${profile.displayName}`} />
            <p>
              I am a: <strong>{profile.occupation}</strong>
            </p>
            <p>
              Originally from <strong>{profile.origin}</strong>
            </p>
            <p>
              Member Since: <strong>{created}</strong>
            </p>
            <p>{profile.about}</p>
          </Grid.Column>
          <Grid.Column width={6}>
            <Header icon="heart outline" content="Interests" />
            {profile.intersts ? (
              <List>
                {profile.interests &&
                  profile.interests.map((interest, index) => {
                    return (
                      <Item key={index}>
                        <Icon name="heart" />
                        <Item.Content>{interest}</Item.Content>
                      </Item>
                    );
                  })}
              </List>
            ) : (
              <p> No intersts</p>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailDescription;
