import React from "react";
import { Menu, Button } from "semantic-ui-react";

export const SignedOut = ({ signIn, register }) => {
  return (
    <Menu.Item position="right">
      <Button basic inverted content="Login" onClick={signIn} />
      <Button
        onClick={register}
        basic
        inverted
        content="Register"
        style={{ marginLeft: "0.5em" }}
      />
    </Menu.Item>
  );
};

// export default SignedOut;
