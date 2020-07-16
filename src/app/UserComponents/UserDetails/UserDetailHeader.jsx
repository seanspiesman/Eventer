import React from "react";
import { differenceInYears } from "date-fns";
import { Grid, Segment, Item, Header } from "semantic-ui-react";
import LazyLoad from "react-lazyload";

const UserDetailHeader = ({ profile, auth }) => {
  let age;
  if (profile.dateOfBirth) {
    age = differenceInYears(Date.now(), profile.dateOfBirth.toDate());
  } else {
    age = "Unknown Age";
  }
  return (
    <Grid.Column width={16}>
      <Segment>
        <Item.Group>
          <Item>
            <LazyLoad
              height={150}
              placeholder={<Item.Image size="small" src={"/assets/user.png"} />}
            >
              <Item.Image
                avatar
                size="small"
                src={profile.photoURL || "/assets/user.png"}
              />
            </LazyLoad>
            <Item.Content verticalAlign="bottom">
              <Header as="h1">{profile.displayName}</Header>
              <br />
              <Header as="h3">{profile.occupation}</Header>
              <br />
              <Header as="h3">
                {age}, Lives in {profile.city || "unknown city"}
              </Header>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailHeader;
