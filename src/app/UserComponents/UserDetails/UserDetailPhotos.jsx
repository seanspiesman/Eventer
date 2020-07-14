import React from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";

const UserDetailPhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="image" content="Photos" />

        <Image.Group size="small">
          {photos &&
            photos.map((photoInfo) => (
              <Image src={photoInfo.url} key={photoInfo.id} />
            ))}
        </Image.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailPhotos;
