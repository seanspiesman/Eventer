import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const LoadingComponents = (inverted = false) => {
  return (
    <Dimmer
      // inverted={inverted}
      active={false}
    >
      <Loader content="Loading..." />
    </Dimmer>
  );
};

export default LoadingComponents;
