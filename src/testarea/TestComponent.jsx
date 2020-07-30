import React, { Component } from "react";
import { connect } from "react-redux";
import { incrementAsync, decrementAsync } from "./testActions";
import { Button, Header } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { openModal } from "../app/Modals/modalActions";
import { toastr } from "react-redux-toastr";
import firebase from "../app/config/firebase";

const mapState = (state) => {
  return {
    data: state.test.data,
    loading: state.async.loading,
    buttonName: state.async.elementName,
  };
};

const actions = {
  incrementAsync,
  decrementAsync,
  openModal,
};

class TestComponent extends Component {
  state = { latlng: { lat: 59.95, lng: 30.33 } };

  handleSelect = (address) => {
    geocodeByAddress(address)
      .then((results) => getLatLng(results[0]))
      .then((latLng) => {
        this.setState({ latlng: latLng });
      })
      .catch((error) => console.error("Error", error));
  };

  handleTestUpdateProfile = async () => {
    const firestore = firebase.firestore();
    // doc = Bob's userUid
    let userDocRef = await firestore
      .collection("users")
      .doc("V17EdVAS65eKB9krds2nbluZMrp1");
    try {
      await userDocRef.update({ displayName: "testing" });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleCreateTestEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    try {
      await eventDocRef.set({
        title: "DELETEME",
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleTestJoinEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    const attendee = {
      photoURL: "/assets/user.png",
      displayName: "Testing",
    };
    try {
      await eventDocRef.update({
        [`attendees.V17EdVAS65eKB9krds2nbluZMrp1`]: attendee,
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleTestCancelGoingToEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    try {
      await eventDocRef.update({
        [`attendees.V17EdVAS65eKB9krds2nbluZMrp1`]: firebase.firestore.FieldValue.delete(),
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  handleTestChangeAttendeePhotoInEvent = async () => {
    const firestore = firebase.firestore();
    let eventDocRef = await firestore.collection("events").doc("DELETEME");
    try {
      await eventDocRef.update({
        [`attendees.V17EdVAS65eKB9krds2nbluZMrp1.photoURL`]: "testing123.jpg",
      });
      toastr.success("Success");
    } catch (error) {
      console.log(error);
      toastr.error("Computer says no");
    }
  };

  render() {
    const {
      data,
      incrementAsync,
      decrementAsync,
      openModal,
      loading,
      buttonName,
    } = this.props;
    return (
      <div>
        <h1>Test Components</h1>
        <h3>The answer is: {data}</h3>
        <Button
          name="increment"
          loading={buttonName === "increment" && loading}
          onClick={(e) => incrementAsync(e.target.name)}
          positive
          content="Increment"
        />
        <Button
          name="decrement"
          loading={buttonName === "decrement" && loading}
          onClick={(e) => decrementAsync(e.target.name)}
          negative
          content="Decrement"
        />
        <Button
          onClick={() => openModal("TestModal", { data: 42 })}
          color="teal"
          // negative
          content="Open Modal"
        />
        <br />
        <br />
        <Header as="h2" content="Permissions tests" />
        <Button
          onClick={this.handleCreateTestEvent}
          color="blue"
          fluid
          content="Test create event - should fail if anon"
        />
        <Button
          onClick={this.handleTestUpdateProfile}
          color="orange"
          fluid
          content="Test update Bobs profile - should fail if anon/not Bob - should succeed if Bob"
        />
        <Button
          onClick={this.handleTestJoinEvent}
          color="olive"
          fluid
          content="Test joining an event - should fail if anon/not Bob - should succeed if Bob"
        />
        <Button
          onClick={this.handleTestCancelGoingToEvent}
          color="purple"
          fluid
          content="Test cancelling attendance to an event - should fail if anon/not Bob - should succeed if Bob"
        />
        <Button
          onClick={this.handleTestChangeAttendeePhotoInEvent}
          color="violet"
          fluid
          content="Test changing photo for event attendee - should fail if anon/not Bob - should succeed if Bob"
        />
        <br />
        <br />

        <TestPlaceInput selectAddress={this.handleSelect} />
        <SimpleMap key={this.state.latlng.lng} latlng={this.state.latlng} />
      </div>
    );
  }
}

export default connect(mapState, actions)(TestComponent);
