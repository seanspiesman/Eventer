import React, { Fragment } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import UserDetailHeader from "./UserDetailHeader";
import UserDetailDescription from "./UserDetailDescription";
import UserDetailSidebar from "./UserDetailSidebar";
import UserDetailPhotos from "./UserDetailPhotos";
import UserDetailEvents from "./UserDetailEvents";
import { Grid } from "semantic-ui-react";

const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos",
    },
  ];
};

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile,
  photos: state.firestore.ordered.photos,
  events: state.firestore.ordered.events,
});

const UserDetailsPage = ({ auth, profile, photos }) => {
  return (
    <Fragment>
      <Grid>
        <UserDetailHeader auth={auth} profile={profile} />
        <UserDetailDescription profile={profile} />
        <UserDetailSidebar />
        <UserDetailPhotos photos={photos} />
        <UserDetailEvents />
      </Grid>
    </Fragment>
  );
};

export default compose(
  connect(mapState),
  firestoreConnect((auth) => query(auth)),
  firestoreConnect([{ collection: "events" }])
)(UserDetailsPage);
