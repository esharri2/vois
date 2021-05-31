export const getSequences = async (userId) => {
  return new Promise((resolve, reject) => {
    window.db
      .ref(`users/${userId}/sequences`)
      .get()
      .then((data) => {
        if (!data.val()) {
          resolve([]);
        }
        const sequences = Object.entries(data.val()).map(([key, value]) => {
          const obj = value;
          const durationInSeconds = obj.actions
            .map((action) => action.duration)
            .reduce((a, b) => a + b, 0);
          const minutes = `${Math.floor(durationInSeconds / 60)}`.padStart(
            2,
            0
          );
          const seconds = `${durationInSeconds - minutes * 60}`.padStart(2, 0);
          const duration = `${minutes}:${seconds}`;
          value.id = key;
          value.duration = duration;
          return obj;
        });
        const sortedSequences = sequences.sort((a, b) => {
          const nameA = a.title.toUpperCase();
          const nameB = b.title.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }

          return 0;
        });
        resolve(sortedSequences);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const postSetting = async (userId, key, rawValue) => {
  console.log(key, rawValue);
  let value = rawValue;
  if (rawValue === "false") {
    value = false;
  }
  const data = {};
  data[key] = value;
  await window.db.ref("users/" + userId + "/settings").update(data);
  return getSettings(userId);
};

export const getSettings = (userId) =>
  new Promise((resolve, reject) => {
    window.db
      .ref(`users/${userId}/settings/`)
      .get()
      .then((data) => {
        resolve(data.val());
      })
      .catch((error) => {
        reject(error);
      });
  });

export const postSequence = async (userId, sequence, sequenceId) => {
  if (typeof userId !== "string" || typeof sequence !== "object") {
    throw new Error("Arguments not correct type");
  }
  if (sequenceId) {
    // Update
    const sequenceListRef = window.db.ref(
      `users/${userId}/sequences/${sequenceId}`
    );
    sequenceListRef.set(sequence);
    return null;
  } else {
    // Create new
    const sequenceListRef = window.db.ref(`users/${userId}/sequences/`);
    const newSequenceRef = sequenceListRef.push();
    await newSequenceRef.set(sequence);
    return newSequenceRef.key;
  }
};

export const postUser = (userId, email) =>
  window.db.ref(`users/${userId}`).set({ email });

export const getSequence = (userId, sequenceId) =>
  new Promise((resolve, reject) => {
    window.db
      .ref(`users/${userId}/sequences/${sequenceId}`)
      .get()
      .then((data) => {
        resolve(data.val());
      })
      .catch((error) => {
        reject(error);
      });
  });

export const deleteSequence = (userId, sequenceId) =>
  window.db.ref(`users/${userId}/sequences/${sequenceId}`).remove();
