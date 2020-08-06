import React, { Fragment, Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect, isEmpty } from "react-redux-firebase";
import UserDetailHeader from "./UserDetailHeader";
import UserDetailDescription from "./UserDetailDescription";
import UserDetailSidebar from "./UserDetailSidebar";
import UserDetailPhotos from "./UserDetailPhotos";
import UserDetailEvents from "./UserDetailEvents";
import { Grid } from "semantic-ui-react";
import { userDetailsQuery } from "../../userActions/userQueries";
import LoadingComponents from "../../LoadingComponents";
import {
  getUserEvents,
  followUser,
  unfollowUser,
} from "../../userActions/userActions";

const mapState = (state, ownProps) => {
  let userUid = null;
  let profile = {};

  if (ownProps.match.params.id === state.auth.uid) {
    profile = state.firebase.profile;
  } else {
    profile =
      !isEmpty(state.firestore.ordered.profile) &&
      state.firestore.ordered.profile[0];
    userUid = ownProps.match.params.id;
  }
  return {
    profile,
    userUid,
    events: state.events.userEvents,
    eventsLoading: state.async.loading,
    auth: state.firebase.auth,
    photos: state.firestore.ordered.photos,
    requesting: state.firestore.status.requesting,
    following: state.firestore.ordered.following,
  };
};

const actions = {
  getUserEvents,
  followUser,
  unfollowUser,
};

class UserDetailsPage extends Component {
  async componentDidMount() {
    await this.props.getUserEvents(this.props.userUid);
  }

  changeTab = (e, data) => {
    this.props.getUserEvents(this.props.userUid, data.activeIndex);
  };

  render() {
    const {
      events,
      eventsLoading,
      auth,
      profile,
      following,
      photos,
      match,
      followUser,
      unfollowUser,
      requesting,
    } = this.props;
    const isCurrentUser = auth.uid === match.params.id;
    const loading = Object.values(requesting).some((a) => a === true);
    const isFollowing = !isEmpty(following);
    console.log(isFollowing);

    if (loading) return <LoadingComponents />;

    return (
      <Fragment>
        <Grid>
          <UserDetailHeader auth={auth} profile={profile} />
          <UserDetailDescription profile={profile} />
          <UserDetailSidebar
            isFollowing={isFollowing}
            profile={profile}
            followUser={followUser}
            isCurrentUser={isCurrentUser}
            unfollowUser={unfollowUser}
          />
          {photos && photos.length > 0 && <UserDetailPhotos photos={photos} />}
          <UserDetailEvents
            eventsLoading={eventsLoading}
            events={events}
            changeTab={this.changeTab}
          />
        </Grid>
      </Fragment>
    );
  }
}

export default compose(
  connect(mapState, actions),
  firestoreConnect((auth, userUid, match) =>
    userDetailsQuery(auth, userUid, match)
  )
)(UserDetailsPage);
