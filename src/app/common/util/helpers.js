export const createNewEvent = (user, photoURL, event) => {
  return {
    ...event,
    hostUid: user.uid,
    hostedBy: user.displayName,
    hostPhotoURL: photoURL || "/assets/user.png",
    created: new Date(),
    attendees: {
      [user.uid]: {
        going: true,
        joinDate: new Date(),
        photoURL: photoURL || "/assets/user.png",
        displayName: user.displayName,
        host: true,
      },
    },
  };
};

export const objectToArray = (object) => {
  if (object) {
    return Object.entries(object).map((event) =>
      Object.assign({}, event[1], { id: event[0] })
    );
  }
};
