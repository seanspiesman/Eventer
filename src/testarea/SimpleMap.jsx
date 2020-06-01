import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import { Icon } from "semantic-ui-react";

const AnyReactComponent = () => (
  <Icon name="marker" size="big" color="red"></Icon>
);

class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33,
    },
    zoom: 11,
  };

  render() {
    const { latlng } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: "300px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAsvxjpdCETdRrzEPsNmqyL9MAVye1jD-Q" }}
          defaultCenter={latlng}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={latlng.lat}
            lng={latlng.lng}
            // text="My Marker"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
