import React from "react";
import { Grid, Segment, Header, Image } from "semantic-ui-react";
import LazyLoad from "react-lazyload";

const UserDetailPhotos = ({ photos }) => {
  return (
    <Grid.Column width={12}>
      <Segment attached>
        <Header icon="image" content="Photos" />

        <Image.Group size="small">
          {photos &&
            photos.map((photoInfo) => (
              <LazyLoad
                key={photoInfo.id}
                height={150}
                // offset={-150} //allows loading of images to happen later
                placeholder={<Image src={"/assets/user.png"} />}
              >
                <Image src={photoInfo.url} />
              </LazyLoad>
            ))}
        </Image.Group>
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailPhotos;
