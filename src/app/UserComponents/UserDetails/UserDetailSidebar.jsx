import React from "react";
import { Grid, Segment, Button } from "semantic-ui-react";

const UserDetailSidebar = ({ isCurrentUser }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser ? (
          <Button color="teal" fluid basic content="Edit Profile" />
        ) : (
          <Button color="teal" fluid basic content="Follow User" />
        )}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailSidebar;
