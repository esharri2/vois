const defaults = () => ({
  headers: {
    "Content-Type": "application/json",
  },
});

const getDefaults = {
  method: "GET",
};

const postDefaults = {
  method: "POST",
};

const deleteDefaults = {
  method: "DELETE",
};

const getOptions = (options = {}, token = null) => {
  return { ...defaults(token), ...getDefaults, ...options };
};

const postOptions = (options = {}, token = null) => {
  return { ...defaults(token), ...postDefaults, ...options };
};

const deleteOptions = (options = {}, token = null) => {
  return { ...defaults(token), ...deleteDefaults, ...options };
};

const handleResponse = async (response) => {
  let json;
  try {
    json = await response.json();
  } catch (error) {
    console.error(error);
    console.error("Response does not contain json.");
    throw new Error();
  }
  if (!response.ok) throw json;
  return json;
};

export const postSequence = (userId, body) => {
  window.db.ref(`users/${userId}`).set({ derp: "hey there" });
};

// function writeUserData(userId, name, email, imageUrl) {
//   firebase
//     .database()
//     .ref("users/" + userId)
//     .set({
//       username: name,
//       email: email,
//       profile_picture: imageUrl,
//     });
// }
