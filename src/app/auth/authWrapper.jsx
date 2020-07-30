import { connectedReduxRedirect } from "redux-auth-wrapper/history4/redirect";
import { openModal } from "../Modals/modalActions";

export const UserIsAuthneticated = connectedReduxRedirect({
  wrapperDisplayName: "UserIsAuthenticated",
  allowRedirectBack: true,
  redirectPath: "/events",
  authenticatedSelector: ({ firebase: { auth } }) =>
    auth.isLoaded && !auth.isEmpty,
  redirectAction: (newLoc) => (dispatch) => {
    dispatch(openModal("UnauthModal"));
  },
});
