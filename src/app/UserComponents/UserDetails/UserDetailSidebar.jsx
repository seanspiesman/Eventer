import React from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserDetailSidebar = ({ isCurrentUser }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && (
          <Button
            as={Link}
            to="/settings/basic"
            color="teal"
            fluid
            content="Edit Profile"
          />
        )}

        {!isCurrentUser && <Button color="teal" fluid content="Follow User" />}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailSidebar;
